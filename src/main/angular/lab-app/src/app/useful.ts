import {Router} from "@angular/router";

export function route(url: string, router: Router) {
  router.navigateByUrl(url).then(() => console.log('Navigated to ' + url))
}

export function canvasRelativeX(event: MouseEvent, canvasContainer: HTMLElement) {
  return event.pageX - canvasContainer.offsetLeft;
}

export function canvasRelativeY(event: MouseEvent, canvasContainer: HTMLElement) {
  return event.pageY - canvasContainer.offsetTop;
}
