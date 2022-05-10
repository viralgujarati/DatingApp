import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { AccountService } from 'src/app/_services/account.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-tabset/src/ngx-tabset';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  // activeTab: TabDirective;
  messages: Message[] = [];
  user: User;

  constructor(public presence: PresenceService, private route: ActivatedRoute, 
     private accountService: AccountService,
    private router: Router) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  // loadMessages() {
  //   this.messageService.getMessageThread(this.member.username).subscribe(messages => {
  //     this.messages = messages;
  //   })
  // }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  // onTabActivated(data: TabDirective) {
  //   this.activeTab = data;
  //   if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
  //     this.messageService.createHubConnection(this.user, this.member.username);
  //   } else {
  //     this.messageService.stopHubConnection();
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.messageService.stopHubConnection();
  // }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}