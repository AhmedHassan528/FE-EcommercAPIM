import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/UserServices/user.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { IUser } from '../../../../core/Interfaces/iuser';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-list',
    imports: [CommonModule, FormsModule, SidebarComponent, TranslateModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  selectedRole: string = 'all';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response|| [];
        this.filterUsers();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastrService.error('admin.users.error', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  filterUsers(): void {
    let filtered = [...this.users];

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phoneNumber.includes(this.searchTerm)
      );
    }

    // Filter by role
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => 
        this.getUserRoles(user).includes(this.selectedRole)
      );
    }

    this.filteredUsers = filtered;
  }

  onSearch(): void {
    this.filterUsers();
  }

  onRoleChange(role: string): void {
    this.selectedRole = role;
    this.filterUsers();
  }

  getUserRoles(user: IUser): string[] {
    if (!user) {
      return [];
    }

    const rawUserRoles = user.userRoles;

    if (Array.isArray(rawUserRoles)) {
      return rawUserRoles;
    }

    if (rawUserRoles && typeof rawUserRoles === 'object' && '$values' in rawUserRoles) {
      const values = (rawUserRoles as { $values?: string[] }).$values;
      if (Array.isArray(values)) {
        return values;
      }
    }

    if (Array.isArray(user.userRoles)) {
      return user.userRoles;
    }

    if (typeof rawUserRoles === 'string') {
      return [rawUserRoles];
    }

    return [];
  }
} 