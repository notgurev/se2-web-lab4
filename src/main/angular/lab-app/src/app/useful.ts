import {Router} from "@angular/router";

export function route(url: string, router: Router) {
  router.navigateByUrl(url).then(() => console.log('Navigated to ' + url))
}
