import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptInEmailComponent } from './opt-in-email.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('OptInEmailComponent', () => {
  let component: OptInEmailComponent;
  let fixture: ComponentFixture<OptInEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptInEmailComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptInEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
