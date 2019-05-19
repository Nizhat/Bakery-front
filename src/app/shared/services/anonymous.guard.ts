import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,  route: ActivatedRoute) {}

    canActivate(acitvatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // this.route.params.subscribe(params => {
      //   if (params.dashboardId) {
      //     this.dashboardId = params.dashboardId;
      //     if (params.folderId) {
      //       this.folderId = params.folderId;
      //     }
      //     this.provider.getGrids(params.dashboardId).then(grids => {
      //       this.grids = grids;
      //       this.gridsLoading = true;
      //     });
      //   }
      // });
      if (localStorage.getItem('access_token')) {
          return true;
        } else {
          // this.router.navigate(['']);
          this.router.navigate([''], { queryParams: { error: 'Экран недоступен! Время действия экрана кончилось' }});
          return false;
        }
    }


}
