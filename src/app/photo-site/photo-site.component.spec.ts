import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSiteComponent } from './photo-site.component';

describe('PhotoSiteComponent', () => {
  let component: PhotoSiteComponent;
  let fixture: ComponentFixture<PhotoSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
