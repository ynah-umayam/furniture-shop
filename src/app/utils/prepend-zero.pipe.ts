import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "prependZero",
})
export class PrependZeroPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = Number(value);
    if (isNaN(num)) {
      return `00`;
    }

    return num < 10 ? `0${num}` : String(num);
  }
}
