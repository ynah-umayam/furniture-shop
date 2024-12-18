import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponet implements OnInit {
  formGroup: FormGroup;
  isLoginButtonDisabled = false;
  failedLoginCount = 0;
  selectedEmail: string | undefined;
  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern("Testpassw0rd!")],
      ],
    });
  }

  ngOnInit(): void {}

  forgotPassword(): void {
    window.open(
      "https://www.google.com",
      "googleWindow",
      "width=600,height=400,top=200,left=300,resizable=yes,scrollbars=yes"
    );
  }

  login(): void {
    if (this.formGroup.valid) {
      this.router.navigateByUrl("/main");
    } else {
      if (
        (!this.selectedEmail && this.formGroup.get("email")?.value) ||
        this.selectedEmail === this.formGroup.get("email")?.value
      ) {
        this.failedLoginCount++;
      }
    }

    if (this.failedLoginCount === 3) {
      this.isLoginButtonDisabled = true;
      this.failedLoginCount = 0;
      setTimeout(() => {
        this.isLoginButtonDisabled = false;
      }, 60000);
    }
    this.selectedEmail = this.formGroup.get("email")?.value;
  }

  signUp(): void {
    this.router.navigateByUrl("/sign-up");
  }
}
