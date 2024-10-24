import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/todo.service';
import { ITodo, TodoStatus } from '../models/models';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }

  public todos: ITodo[] = [];
  public todoStatus = TodoStatus;

  ngOnInit(): void {
    this.initTodos();
  }

  private initTodos() {
    this.todos = this.toDoService.getTodos().map(todo => {
      if (this.isOutdated(todo.deadline)) {
        todo.status = TodoStatus.outdated;
      }
      return todo;
    });
  }

  public onDelete(id?: number) {
    if (id) {
      this.toDoService.deleteTodo(id);
      this.initTodos();
    }
  }

  public statusChange(todo: ITodo) {
    if (todo.status !== TodoStatus.outdated) {
      todo.status = todo.status === TodoStatus.pending ? TodoStatus.completed : TodoStatus.pending;
      this.toDoService.updateTodo(todo);
      this.initTodos();
    }
  }

  private isOutdated(deadline: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return deadline < today;
  }
}