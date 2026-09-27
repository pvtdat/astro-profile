export {};

declare global {
  interface Window {
    goatcounter?: {
      get_data?: () => {
        p?: string;
      };

      visit_count?: (options: {
        append: string;
        path?: string;
        type?: "html" | "svg" | "png";
      }) => void;
    };
  }
}
