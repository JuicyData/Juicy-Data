import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DecisionMakingComponent } from './decision-making.component';
import { OptInEmailComponent } from '../opt-in-email/opt-in-email.component';

describe('DecisionMakingComponent', () => {
  let component: DecisionMakingComponent;
  let fixture: ComponentFixture<DecisionMakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionMakingComponent, OptInEmailComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
