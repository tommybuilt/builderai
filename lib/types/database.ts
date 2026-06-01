export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PriceType = 'free' | 'freemium' | 'paid' | 'unknown'
export type PlatformType = 'web' | 'local' | 'api' | 'hybrid' | 'unknown'
export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string
          description: string | null
          website_url: string | null
          github_url: string | null
          docs_url: string | null
          category_id: string | null
          license: string | null
          price: PriceType
          platform: PlatformType
          difficulty: number
          gpu_required: boolean
          min_vram_gb: number | null
          is_open_source: boolean
          is_self_hosted: boolean
          is_offline_capable: boolean
          tags: string[]
          featured: boolean
          rating_avg: number
          rating_count: number
          status: string
          source_submission_id: string | null
          claimed_by_user_id: string | null
          claimed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description: string
          description?: string | null
          website_url?: string | null
          github_url?: string | null
          docs_url?: string | null
          category_id?: string | null
          license?: string | null
          price?: PriceType
          platform?: PlatformType
          difficulty?: number
          gpu_required?: boolean
          min_vram_gb?: number | null
          is_open_source?: boolean
          is_self_hosted?: boolean
          is_offline_capable?: boolean
          tags?: string[]
          featured?: boolean
          rating_avg?: number
          rating_count?: number
          status?: string
          source_submission_id?: string | null
          claimed_by_user_id?: string | null
          claimed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string
          description?: string | null
          website_url?: string | null
          github_url?: string | null
          docs_url?: string | null
          category_id?: string | null
          license?: string | null
          price?: PriceType
          platform?: PlatformType
          difficulty?: number
          gpu_required?: boolean
          min_vram_gb?: number | null
          is_open_source?: boolean
          is_self_hosted?: boolean
          is_offline_capable?: boolean
          tags?: string[]
          featured?: boolean
          rating_avg?: number
          rating_count?: number
          status?: string
          source_submission_id?: string | null
          claimed_by_user_id?: string | null
          claimed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          tool_id: string
          rating: number
          comment: string | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          rating: number
          comment?: string | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          rating?: number
          comment?: string | null
          user_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tool_id_fkey"
            columns: ["tool_id"]
            referencedRelation: "tools"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions: {
        Row: {
          id: string
          submitted_name: string
          submitted_url: string | null
          submitted_github_url: string | null
          submitted_description: string | null
          submitted_category_slug: string | null
          submitted_tags: string[]
          submitter_email: string
          submitter_user_id: string | null
          status: SubmissionStatus
          admin_notes: string | null
          created_at: string
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          submitted_name: string
          submitted_url?: string | null
          submitted_github_url?: string | null
          submitted_description?: string | null
          submitted_category_slug?: string | null
          submitted_tags?: string[]
          submitter_email: string
          submitter_user_id?: string | null
          status?: SubmissionStatus
          admin_notes?: string | null
          created_at?: string
          reviewed_at?: string | null
        }
        Update: {
          id?: string
          submitted_name?: string
          submitted_url?: string | null
          submitted_github_url?: string | null
          submitted_description?: string | null
          submitted_category_slug?: string | null
          submitted_tags?: string[]
          submitter_email?: string
          submitter_user_id?: string | null
          status?: SubmissionStatus
          admin_notes?: string | null
          created_at?: string
          reviewed_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          user_id: string
          role?: string
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      recalculate_tool_rating: {
        Args: {
          p_tool_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      price_type: PriceType
      platform_type: PlatformType
      submission_status: SubmissionStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row']
export type Tool = Database['public']['Tables']['tools']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Submission = Database['public']['Tables']['submissions']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export type ToolWithCategory = Tool & {
  categories: Category | null
}

export type ToolInsert = Database['public']['Tables']['tools']['Insert']
export type ToolUpdate = Database['public']['Tables']['tools']['Update']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type SubmissionInsert = Database['public']['Tables']['submissions']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
