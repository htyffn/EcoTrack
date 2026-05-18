import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WasteService, WasteType } from '../services/waste.service';

@Component({
  selector: 'app-waste-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="card p-8 md:p-12">
      <h2 class="font-geist-mono text-2xl font-light text-xai-white uppercase mb-8 tracking-tight">
        ADD WASTE ITEM
      </h2>

      <form [formGroup]="wasteForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Row 1: Name (2/3) + Type (1/3) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="sm:col-span-2">
            <label for="name" class="form-label">Waste Name</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Enter waste name"
              class="form-input"
            />
            @if (getError('name'); as error) {
              <span class="error-message">{{ error }}</span>
            }
          </div>

          <div>
            <label for="type" class="form-label">Type</label>
            <select id="type" formControlName="type" class="form-select">
              <option value="">Select type</option>
              <option value="Dangerous">Dangerous</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Special">Special</option>
            </select>
            @if (getError('type'); as error) {
              <span class="error-message">{{ error }}</span>
            }
          </div>
        </div>

        <!-- Row 2: Weight + Date + State -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label for="weight" class="form-label">Weight (KG)</label>
            <input
              id="weight"
              type="number"
              formControlName="weight"
              placeholder="0.00"
              step="0.1"
              min="0"
              class="form-input"
            />
            @if (getError('weight'); as error) {
              <span class="error-message">{{ error }}</span>
            }
          </div>

          <div>
            <label for="date" class="form-label">Date</label>
            <input
              id="date"
              type="date"
              formControlName="date"
              class="form-input"
            />
            @if (getError('date'); as error) {
              <span class="error-message">{{ error }}</span>
            }
          </div>

          <div>
            <label for="state" class="form-label">Initial State</label>
            <select id="state" formControlName="state" class="form-select">
              <option value="">Select state</option>
              <option value="Pending">Pending</option>
              <option value="Processed">Processed</option>
            </select>
            @if (getError('state'); as error) {
              <span class="error-message">{{ error }}</span>
            }
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            [disabled]="!wasteForm.valid"
            class="btn-primary flex-1"
          >
            ADD ITEM
          </button>
          <button
            type="button"
            (click)="onReset()"
            class="btn-ghost flex-1"
          >
            CLEAR
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WasteFormComponent {
  submitted = output<void>();

  private wasteService = inject(WasteService);
  private fb = inject(FormBuilder);

  wasteForm: FormGroup;

  constructor() {
    this.wasteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(0.1)]],
      date: ['', Validators.required],
      state: ['Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.wasteForm.valid) {
      const formValue = this.wasteForm.value;
      this.wasteService.addWaste({
        name: formValue.name,
        type: formValue.type as WasteType,
        weight: parseFloat(formValue.weight),
        date: new Date(formValue.date),
        state: formValue.state
      });
      this.wasteForm.reset({ state: 'Pending' });
      this.submitted.emit();
    }
  }

  onReset(): void {
    this.wasteForm.reset({ state: 'Pending' });
  }

  getError(fieldName: string): string | null {
    const field = this.wasteForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return null;

    if (field.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
    if (field.errors['minlength']) return `${this.formatFieldName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['min']) return `${this.formatFieldName(fieldName)} must be greater than 0`;

    return null;
  }

  private formatFieldName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
