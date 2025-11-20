import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth-Service/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reset-password',
    imports: [ReactiveFormsModule, TranslateModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
    isLoading: boolean = false;
    userId: string = '';
    token: string = '';
    newPassword = '';
    confirmPassword = '';
    isPasswordReset = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _toastrService: ToastrService
    ) { }

    ResetPasswordForm: FormGroup = this._formBuilder.group({
        newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
        confirmPassword: [null, [Validators.required]]
    }, { validators: this.confirmPass });

    ngOnInit() {
        this._route.queryParams.subscribe(params => {
            this.userId = params['UserId'];
            this.token = params['Token'];

            if (!this.userId || !this.token) {
                this._router.navigate(['/forget-password']);
                return;
            }
        });
    }

    confirmPass(g: AbstractControl) {
        if (g.get('newPassword')?.value === g.get('confirmPassword')?.value) {
            return null;
        } else {
            return { mismatch: true };
        }
    }

    ResetPassword() {
        if (!this.newPassword || !this.confirmPassword) {
            this.errorMessage = 'Please fill in all password fields.';
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }

        if (this.newPassword.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters long.';
            return;
        }

        if (!this.token || !this.userId) {
            this.errorMessage = 'Invalid reset link. Please request a new password reset.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this._authService.resetPassword(this.token, this.userId, this.newPassword, this.confirmPassword).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.isPasswordReset = true;
                this.successMessage = 'Password has been reset successfully! Redirecting to login...';

                // Redirect to login page after 3 seconds
                setTimeout(() => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
            }
        });
    }
} 