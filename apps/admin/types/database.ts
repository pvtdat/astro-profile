export type Certification = {
  id: string;
  title: string;
  issuer: string;
  category: string | null;
  issue_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  description: string | null;
  image_url: string | null;
  skills: string[];
  featured: boolean;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type CertificationInput = Omit<
  Certification,
  "id" | "created_at" | "updated_at"
>;

export type Database = {
  public: {
    Tables: {
      certifications: {
        Row: Certification;
        Insert: Partial<CertificationInput> &
          Pick<CertificationInput, "title" | "issuer">;
        Update: Partial<CertificationInput>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: "admin" | "editor" | "viewer";
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: "admin" | "editor" | "viewer";
        };
        Update: { email?: string | null; role?: "admin" | "editor" | "viewer" };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
