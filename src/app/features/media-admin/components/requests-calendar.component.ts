import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal,
} from '@angular/core';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

import { ServiceRequestViewModel } from '../service-requests-admin.service';

type CalendarDay = {
  date: Date;
  key: string;
  isCurrentMonth: boolean;
  requests: ServiceRequestViewModel[];
};

@Component({
  selector: 'tj-requests-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="requests-calendar">
      <header class="requests-calendar__header">
        <h2>Calendario de solicitudes</h2>
        <div class="requests-calendar__controls">
          <button type="button" (click)="previousMonth()">Anterior</button>
          <strong>{{ currentMonthLabel() }}</strong>
          <button type="button" (click)="nextMonth()">Siguiente</button>
        </div>
      </header>

      <div class="requests-calendar__legend">
        <span><i class="dot dot--new"></i> Nuevo</span>
        <span><i class="dot dot--contacted"></i> Contactado</span>
        <span><i class="dot dot--closed"></i> Cerrado</span>
      </div>

      <div class="calendar-weekdays">
        @for (weekday of weekdays; track weekday) {
          <span>{{ weekday }}</span>
        }
      </div>

      <div class="calendar-grid">
        @for (day of days(); track day.key) {
          <article class="calendar-day" [class.outside]="!day.isCurrentMonth" [class.today]="isToday(day.date)">
            <header>
              <span>{{ day.date | date: 'd' }}</span>
              @if (day.requests.length) {
                <small>{{ day.requests.length }}</small>
              }
            </header>

            <div class="calendar-day__items">
              @for (request of day.requests.slice(0, 3); track request.id) {
                <div class="calendar-chip" [class.new]="request.status === 'new'" [class.contacted]="request.status === 'contacted'" [class.closed]="request.status === 'closed'">
                  {{ request.name }}
                </div>
              }
              @if (day.requests.length > 3) {
                <div class="calendar-more">+{{ day.requests.length - 3 }} más</div>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .requests-calendar {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.02);
        padding: 16px;
      }

      .requests-calendar__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 12px;
      }

      .requests-calendar__header h2 {
        margin: 0;
        font-size: 1rem;
      }

      .requests-calendar__controls {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }

      .requests-calendar__legend {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 10px;
        color: #aebcc9;
        font-size: 0.76rem;
      }

      .requests-calendar__legend span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        display: inline-block;
      }

      .dot--new {
        background: rgba(0, 212, 255, 0.95);
      }

      .dot--contacted {
        background: rgba(243, 173, 58, 0.95);
      }

      .dot--closed {
        background: rgba(16, 185, 129, 0.95);
      }

      .requests-calendar__controls button {
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 6px 10px;
        cursor: pointer;
      }

      .calendar-weekdays,
      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 8px;
      }

      .calendar-weekdays {
        margin-bottom: 8px;
      }

      .calendar-weekdays span {
        text-align: center;
        font-size: 0.78rem;
        color: #9ba5b2;
      }

      .calendar-day {
        min-height: 108px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 8px;
        background: rgba(255, 255, 255, 0.015);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .calendar-day.outside {
        opacity: 0.45;
      }

      .calendar-day.today {
        border-color: rgba(102, 224, 255, 0.45);
        box-shadow: inset 0 0 0 1px rgba(102, 224, 255, 0.22);
      }

      .calendar-day header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .calendar-day header small {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        border-radius: 999px;
        background: rgba(0, 212, 255, 0.16);
        color: #a9eeff;
        font-size: 0.74rem;
      }

      .calendar-day__items {
        display: grid;
        gap: 4px;
      }

      .calendar-chip {
        border-radius: 8px;
        padding: 2px 6px;
        font-size: 0.72rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .calendar-chip.new {
        background: rgba(0, 212, 255, 0.15);
        border: 1px solid rgba(0, 212, 255, 0.35);
      }

      .calendar-chip.contacted {
        background: rgba(243, 173, 58, 0.14);
        border: 1px solid rgba(243, 173, 58, 0.32);
      }

      .calendar-chip.closed {
        background: rgba(16, 185, 129, 0.14);
        border: 1px solid rgba(16, 185, 129, 0.35);
      }

      .calendar-more {
        font-size: 0.72rem;
        color: #9ba5b2;
      }

      @media (max-width: 900px) {
        .calendar-day {
          min-height: 94px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsCalendarComponent {
  @Input({ required: true }) requests: ServiceRequestViewModel[] = [];

  readonly weekdays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  readonly currentMonth = signal<Date>(startOfMonth(new Date()));

  readonly currentMonthLabel = computed(() =>
    format(this.currentMonth(), 'MMMM yyyy'),
  );

  readonly days = computed<CalendarDay[]>(() => {
    const month = this.currentMonth();
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const grouped = this.requests.reduce<Record<string, ServiceRequestViewModel[]>>(
      (acc, request) => {
        const key = request.effectiveDate.slice(0, 10);
        const current = acc[key] ?? [];
        current.push(request);
        acc[key] = current;
        return acc;
      },
      {},
    );

    const rows: CalendarDay[] = [];
    let cursor = gridStart;

    while (cursor <= gridEnd) {
      const key = format(cursor, 'yyyy-MM-dd');
      rows.push({
        date: cursor,
        key,
        isCurrentMonth: isSameMonth(cursor, month),
        requests: grouped[key] ?? [],
      });
      cursor = addDays(cursor, 1);
    }

    return rows;
  });

  previousMonth(): void {
    this.currentMonth.set(startOfMonth(subMonths(this.currentMonth(), 1)));
  }

  nextMonth(): void {
    this.currentMonth.set(startOfMonth(addMonths(this.currentMonth(), 1)));
  }

  isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }
}
