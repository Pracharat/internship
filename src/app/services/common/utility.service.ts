import { Injectable } from '@angular/core';
import { formatNumber } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { CustomURLEncoder } from '../core/custom-url-encoder';

// import { CustomURLEncoder } from '@app-services/core/custom-url-encoder';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  static generateUuid(): string {
    return uuid();
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  static compareObjectJsonString(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  static copyObject<T>(object: T): T {
    return !!object ? JSON.parse(JSON.stringify(object)) : null;
  }

  static isEmptyObject<T>(object: T): boolean {
    return Object.keys(object).length === 0;
  }

  static removeEmptyProperties<T>(object: T): T {
    if (this.isNullOrUndefined(object)) {
      return null;
    }

    const obj = this.copyObject<T>(object);
    Object.keys(obj).forEach((key) => {
      return (obj[key] == null || obj[key] === undefined || obj[key] === '') && delete obj[key];
    });
    return obj;
  }

  static removeProperty<T>(object: T, propToRemove: string): T {
    const copiedObject = this.copyObject<T>(object);
    const removedPropObj: T = Object.keys(copiedObject).reduce((obj, key) => {
      if (key !== propToRemove) {
        obj[key] = object[key];
      }
      return obj;
    }, {} as T);

    return removedPropObj;
  }

  static createNumberArray(size: number, startAt?: number, endAt?: number): number[] {
    if (size < 0) {
      size = 1;
    }

    const arraryNumber: number[] = Array
      .from(Array(size).keys())
      .map(n => n + 1)
      .filter(n => {
        const start = !this.isNullOrUndefined(startAt) ? startAt : 1;
        const end = !this.isNullOrUndefined(endAt) ? endAt : size + 1;
        return n >= start && n <= end;
      });

    return arraryNumber;
  }

  static formatNumber(value: number, locale = 'en', digitsInfo?: string): string {
    return formatNumber(value, locale || 'en', digitsInfo);
  }

  // Workaround to fix encode with some special characters
  static encodeHttpParams(params: { [key: string]: any }) {
    if (!params) {
      return null;
    }

    return Object
      .getOwnPropertyNames(params)
      .reduce((prev, key) => prev.set(key, params[key]), new HttpParams({ encoder: new CustomURLEncoder() }));
  }

}
