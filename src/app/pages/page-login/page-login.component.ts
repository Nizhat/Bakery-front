import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router,
                private route: ActivatedRoute, private title: Title) { }
    login: string = '';
    password: string = '';
    errorMessage = '';
    loading: boolean = false;
    returnUrl: string;

    ngOnInit() {
        this.title.setTitle('Bakery');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    }

    runScript(event) {
        if (event.which == 13 || event.keyCode == 13) {
            this.logIn();
        }
    }

    logIn() {
        if (this.login && this.password) {
            this.loading = true;
            this.errorMessage = '';
            this.authService.login(this.login, this.password)
                .subscribe(
                    (response: any) => {
                        if (response.access_token) {
                            // this.authService.setAccessToken(response);
                            // this.authService.setRefreshToken(response.refresh_token);
                            // this.authService.setUserRoles(response.roles);
                            this.errorMessage = '';

                            this.loading = false;
                            this.router.navigateByUrl(this.returnUrl, { queryParams: { }});
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.errorMessage = 'Имя пользователя или пароль указаны не верно!';
                    }
                );
        } else {
            if (!this.login && !this.password) {
                this.errorMessage = 'Вы не ввели логин и пароль!';
            } else if (!this.login) {
                this.errorMessage = 'Вы не ввели логин!';
            } else if (!this.password) {
                this.errorMessage = 'Вы не ввели пароль!';
            }
        }
    }

    ngOnDestroy() {

    }

}
