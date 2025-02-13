import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  users: any[] = [];
  allRoles = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']; // Define all possible roles

  constructor(private userService: UserService) { }

  

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users loaded:', this.users); // Afficher les utilisateurs pour vérifier les IDs
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  updateUserRoles(user): void {
    console.log('Updating roles for user:', user);
    // Fichier: src/app/board-admin/admin-board.component.ts
this.userService.updateUserRoles(user.id, user.roles).subscribe(
  response => {
    console.log('Roles updated', response);
  },
  error => {
    console.error('Error updating roles', error);
  }
);

  }
  

   
  newUser: any = { username: '', email: '', password: '', roles: [] };

addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
        response => {
            console.log('User added successfully:', response);
            this.fetchUsers();  // Rafraîchir la liste des utilisateurs
            this.newUser = { username: '', email: '', password: '', roles: [] }; // Réinitialiser le modèle
        },
        error => {
            console.error('Error adding user:', error);
        }
    );
}

  

  deleteUser(user): void {
    if (confirm("Are you sure to delete " + user.username + "?")) {
      this.userService.deleteUser(user.id).subscribe(
        response => {
          console.log("User deleted successfully", response);
          this.fetchUsers(); // Actualiser la liste après la suppression
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  
 

    
  }
  


