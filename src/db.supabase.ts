export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      color: {
        Row: {
          codigo_color: string
          id: number
          nombre_color: string
          slug: string | null
          state: boolean
        }
        Insert: {
          codigo_color: string
          id?: number
          nombre_color: string
          slug?: string | null
          state: boolean
        }
        Update: {
          codigo_color?: string
          id?: number
          nombre_color?: string
          slug?: string | null
          state?: boolean
        }
        Relationships: []
      }
      moto: {
        Row: {
          certificacion: string
          cilindraje: number
          descripcion_corta: string
          dimension_total: string
          distancia_entre_ejes: string
          id: number
          id_arranque: number | null
          id_estilo: number
          id_freno_delantero: number | null
          id_freno_trasero: number | null
          id_marca: number | null
          id_suspension_delantera: number | null
          id_suspension_trasera: number | null
          id_tipo_transmision: number | null
          modelo: number
          nombre: string
          peso: number
          potencia_maxima_hp: number
          potencia_maxima_rpm: number
          precio_moto: number
          precio_papeles: number
          relacion_compresion: string
          rueda_delantera: string
          rueda_trasera: string
          seo_descripcion: string
          seo_titulo: string
          slug_moto: string
          tipo_motor: string
          torque_maximo_nm: number
          torque_maximo_rpm: number
          url_foto: string | null
          url_img_header: string | null
        }
        Insert: {
          certificacion: string
          cilindraje: number
          descripcion_corta: string
          dimension_total: string
          distancia_entre_ejes: string
          id?: number
          id_arranque?: number | null
          id_estilo: number
          id_freno_delantero?: number | null
          id_freno_trasero?: number | null
          id_marca?: number | null
          id_suspension_delantera?: number | null
          id_suspension_trasera?: number | null
          id_tipo_transmision?: number | null
          modelo: number
          nombre: string
          peso: number
          potencia_maxima_hp: number
          potencia_maxima_rpm: number
          precio_moto: number
          precio_papeles: number
          relacion_compresion: string
          rueda_delantera: string
          rueda_trasera: string
          seo_descripcion: string
          seo_titulo: string
          slug_moto: string
          tipo_motor: string
          torque_maximo_nm: number
          torque_maximo_rpm: number
          url_foto?: string | null
          url_img_header?: string | null
        }
        Update: {
          certificacion?: string
          cilindraje?: number
          descripcion_corta?: string
          dimension_total?: string
          distancia_entre_ejes?: string
          id?: number
          id_arranque?: number | null
          id_estilo?: number
          id_freno_delantero?: number | null
          id_freno_trasero?: number | null
          id_marca?: number | null
          id_suspension_delantera?: number | null
          id_suspension_trasera?: number | null
          id_tipo_transmision?: number | null
          modelo?: number
          nombre?: string
          peso?: number
          potencia_maxima_hp?: number
          potencia_maxima_rpm?: number
          precio_moto?: number
          precio_papeles?: number
          relacion_compresion?: string
          rueda_delantera?: string
          rueda_trasera?: string
          seo_descripcion?: string
          seo_titulo?: string
          slug_moto?: string
          tipo_motor?: string
          torque_maximo_nm?: number
          torque_maximo_rpm?: number
          url_foto?: string | null
          url_img_header?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moto_id_arranque_fkey"
            columns: ["id_arranque"]
            isOneToOne: false
            referencedRelation: "motostipoarranque"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_freno_delantero_fkey"
            columns: ["id_freno_delantero"]
            isOneToOne: false
            referencedRelation: "motosfreno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_freno_trasero_fkey"
            columns: ["id_freno_trasero"]
            isOneToOne: false
            referencedRelation: "motosfreno"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_marca_fkey"
            columns: ["id_marca"]
            isOneToOne: false
            referencedRelation: "motosmarca"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_suspension_delantera_fkey"
            columns: ["id_suspension_delantera"]
            isOneToOne: false
            referencedRelation: "motossuspension"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_suspension_trasera_fkey"
            columns: ["id_suspension_trasera"]
            isOneToOne: false
            referencedRelation: "motossuspension"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moto_id_tipo_transmision_fkey"
            columns: ["id_tipo_transmision"]
            isOneToOne: false
            referencedRelation: "motostransmision"
            referencedColumns: ["id"]
          }
        ]
      }
      motocolor: {
        Row: {
          id: number
          id_color: number | null
          id_moto: number | null
          url_foto_color_grande: string | null
          url_foto_color_peque: string | null
        }
        Insert: {
          id?: number
          id_color?: number | null
          id_moto?: number | null
          url_foto_color_grande?: string | null
          url_foto_color_peque?: string | null
        }
        Update: {
          id?: number
          id_color?: number | null
          id_moto?: number | null
          url_foto_color_grande?: string | null
          url_foto_color_peque?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motocolor_id_color_fkey"
            columns: ["id_color"]
            isOneToOne: false
            referencedRelation: "color"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motocolor_id_moto_fkey"
            columns: ["id_moto"]
            isOneToOne: false
            referencedRelation: "moto"
            referencedColumns: ["id"]
          }
        ]
      }
      motosfreno: {
        Row: {
          id: number
          nombre_freno: string
          slug: string
          state: boolean
        }
        Insert: {
          id?: number
          nombre_freno: string
          slug: string
          state: boolean
        }
        Update: {
          id?: number
          nombre_freno?: string
          slug?: string
          state?: boolean
        }
        Relationships: []
      }
      motosmarca: {
        Row: {
          id: number
          nombre_marca: string
          slug: string
          state: boolean
        }
        Insert: {
          id?: number
          nombre_marca: string
          slug: string
          state: boolean
        }
        Update: {
          id?: number
          nombre_marca?: string
          slug?: string
          state?: boolean
        }
        Relationships: []
      }
      motossuspension: {
        Row: {
          id: number
          nombre_suspension: string
          slug: string
          state: boolean
        }
        Insert: {
          id?: number
          nombre_suspension: string
          slug: string
          state: boolean
        }
        Update: {
          id?: number
          nombre_suspension?: string
          slug?: string
          state?: boolean
        }
        Relationships: []
      }
      motostipoarranque: {
        Row: {
          id: number
          nombre_tipo_arranque: string
          slug: string
          state: boolean
        }
        Insert: {
          id?: number
          nombre_tipo_arranque: string
          slug: string
          state: boolean
        }
        Update: {
          id?: number
          nombre_tipo_arranque?: string
          slug?: string
          state?: boolean
        }
        Relationships: []
      }
      motostransmision: {
        Row: {
          id: number
          nombre_transmision: string
          slug: string
          tipo_filtro: string
        }
        Insert: {
          id?: number
          nombre_transmision: string
          slug: string
          tipo_filtro: string
        }
        Update: {
          id?: number
          nombre_transmision?: string
          slug?: string
          tipo_filtro?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
