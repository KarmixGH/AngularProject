import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponsiblePerson, ITodo, TodoStatus } from '../models/models';
import { RespPersonService } from '../services/resp-person.service';
import { Observable } from 'rxjs';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  public id?: number;
  public form: FormGroup;
  public invalidForm: boolean = false;
  public persons: Observable<IResponsiblePerson[]>;

  private currentToDo?: ITodo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private respPersonService: RespPersonService,
    private toDoService: ToDoService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      assignee: ['', Validators.required],
    });

    this.persons = this.respPersonService.getRespPersons();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.currentToDo = this.toDoService.getTodo(this.id);
      if (this.currentToDo) {
        this.form.patchValue(this.currentToDo);
      }
    }
  }

  get title() {
    return this.form.get('title');
  }

  get deadline() {
    return this.form.get('deadline');
  }

  get assignee() {
    return this.form.get('assignee');
  }

  public onsubmit(): void {
    if (this.form.valid) {
      const todo: ITodo = {
        id: this.currentToDo?.id ?? this.generateId(),
        status: this.currentToDo?.status ?? TodoStatus.pending,
        createDate: this.currentToDo?.createDate ?? this.getCurrentDate(),
        deadline: this.deadline?.value,
        title: this.title?.value,
        assignee: this.assignee?.value,
      };

      if (this.id) {
        this.toDoService.updateTodo(todo);
      } else {
        this.toDoService.addTodo(todo);
      }

      this.close();
    } else {
      this.invalidForm = true;
    }
  }

  private generateId(): number {
    return Math.ceil(Math.random() * 1000000);
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  public close(): void {
    this.form.reset();
    this.router.navigate(['']);
  }
}