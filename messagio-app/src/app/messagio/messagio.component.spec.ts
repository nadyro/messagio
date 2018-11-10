import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagioComponent } from './messagio.component';

describe('MessagioComponent', () => {
  let component: MessagioComponent;
  let fixture: ComponentFixture<MessagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
