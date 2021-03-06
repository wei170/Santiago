import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { UserService, PopupService } from '../../_services/index'
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html'
})
export class Navbar implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  router: Router;

  private numOfNotifications: Number;
  private searchName: string = "";

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    el: ElementRef, 
    config: AppConfig, 
    router: Router,
    private userService: UserService,
    private popupService: PopupService
  ) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  onDashboardSearch(): void {
    // search a user in the entire Purdue user db
    this.userService.searchUser(this.searchName).subscribe(
      data => {
          this.popupService.popUser(this.searchName);
      },
      error => {
          this.popupService.popError("Error",JSON.parse(error._body).err);
      }
    );  
  }

  ngOnInit(): void {
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

    // Guocheng
    updateNotificationsNum(num: Number) {
        this.numOfNotifications = num;
    }
}
