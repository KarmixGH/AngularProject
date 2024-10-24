import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string | Date, formatType?: string): string {
    const date = this.parseDate(value);
    if (!date) {
      return 'Invalid date'; 
    }

    switch (formatType) {
      case 'short':
        return this.formatShortDate(date);
      case 'long':
        return this.formatLongDate(date);
      default:
        return this.formatDefaultDate(date);
    }
  }

  private parseDate(value: string | Date): Date | null {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date; 
  }

  private formatDefaultDate(date: Date): string {
    return `${this.padNumber(date.getDate())}/${this.padNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  private formatShortDate(date: Date): string {
    return `${this.padNumber(date.getMonth() + 1)}/${this.padNumber(date.getDate())}`;
  }

  private formatLongDate(date: Date): string {
    return `${this.padNumber(date.getDate())} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
  }

  private padNumber(num: number): string {
    return String(num).padStart(2, '0');
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  }
}