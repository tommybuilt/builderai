import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { toolId, rating, comment } = await request.json()
    
    if (!toolId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating data' }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ 
        error: 'You must be logged in to rate tools',
        code: 'AUTH_REQUIRED'
      }, { status: 401 })
    }

    // Get client IP for additional spam prevention
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0]?.trim() || realIp || 'unknown'

    // Check if this user has already rated this tool
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('tool_id', toolId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existingReview) {
      return NextResponse.json({
        error: 'You have already rated this tool',
        code: 'ALREADY_RATED'
      }, { status: 409 })
    }

    // Also check by IP (prevents multi-account spam)
    const { data: existingIpReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('tool_id', toolId)
      .eq('ip_address', clientIp)
      .maybeSingle()

    if (existingIpReview) {
      return NextResponse.json({ 
        error: 'A rating from your network has already been submitted for this tool',
        code: 'IP_ALREADY_RATED'
      }, { status: 409 })
    }

    // Insert the review
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        tool_id: toolId,
        rating,
        comment: comment?.trim() || null,
        user_id: user.id,
        ip_address: clientIp
      })
      .select()
      .single()

    if (reviewError) {
      console.error('Error creating review:', reviewError)
      return NextResponse.json({ error: reviewError.message }, { status: 500 })
    }

    // Update tool rating average
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('tool_id', toolId)

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      
      await supabase
        .from('tools')
        .update({
          rating_avg: Math.round(avgRating * 100) / 100,
          rating_count: reviews.length
        })
        .eq('id', toolId)
    }

    return NextResponse.json({ success: true, data: review })
  } catch (e) {
    console.error('Error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
