import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { matchFieldsValidator } from "../../utils";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w*]).+$/),
        ],
      ],
      confirmPassword: [
        "",
        [Validators.required, matchFieldsValidator("password")],
      ],
    });
  }

  signUp(): void {
    if (this.formGroup.valid) {
      this.router.navigateByUrl("/main");
    }
  }
}
