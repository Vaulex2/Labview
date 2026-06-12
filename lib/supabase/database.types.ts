export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_logs: {
        Row: {
          created_at: string
          event: string
          id: number
          payload: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event: string
          id?: never
          payload?: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event?: string
          id?: never
          payload?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          detail: Json
          entity: string
          entity_id: string | null
          id: number
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          detail?: Json
          entity: string
          entity_id?: string | null
          id?: never
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          detail?: Json
          entity?: string
          entity_id?: string | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          context: string | null
          created_at: string
          detail: Json
          id: number
          message: string
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          detail?: Json
          id?: never
          message: string
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          detail?: Json
          id?: never
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_summaries: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          order_index: number
          paragraphs: Json
          section_title: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          order_index?: number
          paragraphs?: Json
          section_title: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          order_index?: number
          paragraphs?: Json
          section_title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_summaries_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "video_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          payload: Json
          read_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payload?: Json
          read_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          enrolled_at: string
          first_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["account_status"]
          student_id: string | null
          surname: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          enrolled_at?: string
          first_name?: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["account_status"]
          student_id?: string | null
          surname?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          enrolled_at?: string
          first_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["account_status"]
          student_id?: string | null
          surname?: string
          updated_at?: string
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          last_viewed_at: string | null
          lesson_id: string
          progress_percent: number
          quiz_best_score: number | null
          status: Database["public"]["Enums"]["progress_status"]
          updated_at: string
          user_id: string
          watched_seconds: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          lesson_id: string
          progress_percent?: number
          quiz_best_score?: number | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id: string
          watched_seconds?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          lesson_id?: string
          progress_percent?: number
          quiz_best_score?: number | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id?: string
          watched_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_tracking_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "video_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: Json
          created_at: string
          explanation: Json
          id: string
          image_url: string | null
          options: Json | null
          order_index: number
          points: number
          prompt: Json
          quiz_id: string
          type: Database["public"]["Enums"]["question_type"]
          updated_at: string
        }
        Insert: {
          correct_answer: Json
          created_at?: string
          explanation: Json
          id?: string
          image_url?: string | null
          options?: Json | null
          order_index?: number
          points?: number
          prompt: Json
          quiz_id: string
          type: Database["public"]["Enums"]["question_type"]
          updated_at?: string
        }
        Update: {
          correct_answer?: Json
          created_at?: string
          explanation?: Json
          id?: string
          image_url?: string | null
          options?: Json | null
          order_index?: number
          points?: number
          prompt?: Json
          quiz_id?: string
          type?: Database["public"]["Enums"]["question_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_results: {
        Row: {
          answers: Json
          completed_at: string
          id: string
          max_score: number
          passed: boolean
          percentage: number
          quiz_id: string
          score: number
          time_spent_seconds: number
          user_id: string
        }
        Insert: {
          answers?: Json
          completed_at?: string
          id?: string
          max_score: number
          passed: boolean
          percentage: number
          quiz_id: string
          score: number
          time_spent_seconds?: number
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          id?: string
          max_score?: number
          passed?: boolean
          percentage?: number
          quiz_id?: string
          score?: number
          time_spent_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          created_by: string | null
          description: Json
          id: string
          lesson_id: string
          passing_score: number
          time_limit_minutes: number | null
          title: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: Json
          id?: string
          lesson_id: string
          passing_score?: number
          time_limit_minutes?: number | null
          title: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: Json
          id?: string
          lesson_id?: string
          passing_score?: number
          time_limit_minutes?: number | null
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "video_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      video_lessons: {
        Row: {
          category: Database["public"]["Enums"]["lesson_category"]
          created_at: string
          created_by: string | null
          difficulty: Database["public"]["Enums"]["lesson_difficulty"]
          duration_minutes: number
          id: string
          is_published: boolean
          order_index: number
          presentation_url: string | null
          slug: string
          tags: Json
          thumbnail_url: string | null
          title: Json
          updated_at: string
          video_path: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["lesson_category"]
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["lesson_difficulty"]
          duration_minutes?: number
          id?: string
          is_published?: boolean
          order_index?: number
          presentation_url?: string | null
          slug: string
          tags?: Json
          thumbnail_url?: string | null
          title: Json
          updated_at?: string
          video_path?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["lesson_category"]
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["lesson_difficulty"]
          duration_minutes?: number
          id?: string
          is_published?: boolean
          order_index?: number
          presentation_url?: string | null
          slug?: string
          tags?: Json
          thumbnail_url?: string | null
          title?: Json
          updated_at?: string
          video_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_lessons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visualization_examples: {
        Row: {
          complexity: Database["public"]["Enums"]["viz_complexity"]
          created_at: string
          description: Json
          diagram_id: string
          id: string
          lesson_id: string
          order_index: number
          title: Json
          updated_at: string
        }
        Insert: {
          complexity?: Database["public"]["Enums"]["viz_complexity"]
          created_at?: string
          description: Json
          diagram_id: string
          id?: string
          lesson_id: string
          order_index?: number
          title: Json
          updated_at?: string
        }
        Update: {
          complexity?: Database["public"]["Enums"]["viz_complexity"]
          created_at?: string
          description?: Json
          diagram_id?: string
          id?: string
          lesson_id?: string
          order_index?: number
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visualization_examples_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "video_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      visualization_sessions: {
        Row: {
          animation_speed: number
          created_at: string
          duration_seconds: number
          example_id: string
          id: string
          interactions: Json
          user_id: string
        }
        Insert: {
          animation_speed?: number
          created_at?: string
          duration_seconds?: number
          example_id: string
          id?: string
          interactions?: Json
          user_id: string
        }
        Update: {
          animation_speed?: number
          created_at?: string
          duration_seconds?: number
          example_id?: string
          id?: string
          interactions?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visualization_sessions_example_id_fkey"
            columns: ["example_id"]
            isOneToOne: false
            referencedRelation: "visualization_examples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visualization_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_email_for_student_id: {
        Args: { p_student_id: string }
        Returns: string
      }
      get_quiz_questions: {
        Args: { p_quiz_id: string }
        Returns: {
          id: string
          image_url: string
          options: Json
          order_index: number
          points: number
          prompt: Json
          quiz_id: string
          type: Database["public"]["Enums"]["question_type"]
        }[]
      }
      get_quiz_review: {
        Args: { p_quiz_id: string }
        Returns: {
          correct_answer: Json
          explanation: Json
          question_id: string
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      submit_quiz: {
        Args: { p_answers: Json; p_quiz_id: string; p_time_spent?: number }
        Returns: {
          answers: Json
          completed_at: string
          id: string
          max_score: number
          passed: boolean
          percentage: number
          quiz_id: string
          score: number
          time_spent_seconds: number
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "quiz_results"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      account_status: "active" | "suspended"
      lesson_category:
        | "loops"
        | "arrays"
        | "clusters"
        | "arithmetic"
        | "boolean"
        | "events"
        | "waveforms"
        | "subvi"
        | "structures"
        | "data-types"
        | "debugging"
      lesson_difficulty: "beginner" | "intermediate" | "advanced"
      progress_status: "not-started" | "in-progress" | "completed"
      question_type:
        | "multiple-choice"
        | "drag-drop"
        | "output-prediction"
        | "labview-analysis"
      user_role: "student" | "teacher" | "admin"
      viz_complexity: "simple" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "suspended"],
      lesson_category: [
        "loops",
        "arrays",
        "clusters",
        "arithmetic",
        "boolean",
        "events",
        "waveforms",
        "subvi",
        "structures",
        "data-types",
        "debugging",
      ],
      lesson_difficulty: ["beginner", "intermediate", "advanced"],
      progress_status: ["not-started", "in-progress", "completed"],
      question_type: [
        "multiple-choice",
        "drag-drop",
        "output-prediction",
        "labview-analysis",
      ],
      user_role: ["student", "teacher", "admin"],
      viz_complexity: ["simple", "advanced"],
    },
  },
} as const
