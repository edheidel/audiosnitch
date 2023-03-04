import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

// CORS configuration with allowed HTTP methods for the API middleware.
export const cors = Cors({ methods: ["GET", "HEAD"] });

// Middleware function that encapsulates the necessary boilerplate code for handling server API requests.
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: {(
        _req: Cors.CorsRequest,
        _res: {
          statusCode?: number | undefined;
          setHeader(_key: string, _value: string): any;
          end(): any;
        },
        _next: (_err?: any) => any
      ): void;
      (_arg0: NextApiRequest, _arg1: NextApiResponse<any>, _arg2: (_result: any) => void): void;
  },
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
