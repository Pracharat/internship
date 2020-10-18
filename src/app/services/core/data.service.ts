import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MethodNotAllowedError } from 'src/app/core/error/method-not-allowed.error';
import { ServerError } from 'src/app/core/error/server.error';
import { AppError } from 'src/app/core/error/app.error';
import { NotFoundError } from 'src/app/core/error/not-found.error';
import { ForbiddenError } from 'src/app/core/error/forbidden.error';
import { UnauthorizeError } from 'src/app/core/error/unauthorize.error';
import { BadRequestError } from 'src/app/core/error/bad-request.error';
import { NgModule } from '@angular/core';



type HttpParamsType = HttpParams | { [param: string]: string | string[] };

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    protected http: HttpClient,
  ) { }

  public get<T>(url: string, params?: HttpParamsType): Observable<T> {
    // params = UtilityService.encodeHttpParams(params);
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError),
    );
  }

  public post<T>(url: string, resource: any): Observable<T> {
    return this.http.post<T>(url, resource).pipe(
      catchError(this.handleError),
    );
  }

  public put<T>(url: string, resource: any): Observable<T> {
    return this.http.put<T>(url, resource).pipe(
      catchError(this.handleError),
    );
  }

  public patch<T>(url: string, resource: any): Observable<T> {
    return this.http.patch<T>(url, resource).pipe(
      catchError(this.handleError),
    );
  }

  public delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(url).pipe(
      catchError(this.handleError),
    );
  }
  protected request<T>(httpRequest: HttpRequest<T>) {
    return this.http.request<T>(httpRequest).pipe(
      catchError(this.handleError),
    );
  }



  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        return throwError(new BadRequestError(error));

      case 401:
        return throwError(new UnauthorizeError(error));

      case 403:
        return throwError(new ForbiddenError(error));

      case 404:
        return throwError(new NotFoundError(error));

      case 405:
        return throwError(new MethodNotAllowedError(error));

      case 500:
        return throwError(new ServerError(error));

      default:
        return throwError(new AppError(error));
    }
  }
}
