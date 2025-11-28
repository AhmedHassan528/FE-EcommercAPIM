import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/Auth-Service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthStateService } from '../../../../core/services/Auth-Service/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  LoginForm: FormGroup;
  isLoading = false;
  isLoginSuccess = false;
  errorMessage = '';
  successMessage = '';
  private authSubscription?: Subscription;

  constructor(
    private _authService: AuthService,
    private _authStateService: AuthStateService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.LoginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  LoginSubmit() {
    if (this.LoginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this._authService.LoginUser(this.LoginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isLoginSuccess = true;
        this.successMessage = 'Login successful! Redirecting to home...';
        
        // Store user data if needed
        if (res.token) {
          localStorage.setItem('userToken', res.token);
        }
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }

        // Update authentication state
        this._authStateService.login();

        console.log('Login successful:', res);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          this._router.navigate(['/products']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
        console.error('Login error:', error);
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.LoginForm.controls).forEach(key => {
      const control = this.LoginForm.get(key);
      control?.markAsTouched();
    });
  }

  goToSignUp() {
    this._router.navigate(['/signup']);
  }
}