import { Service } from "typedi";
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';

@Service()
@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err: any) => any) {
        if (error instanceof HttpError) {
            response.status(error.httpCode).json(error);
        }

        next(error);
    }
}