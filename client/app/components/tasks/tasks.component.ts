import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';

@Component({
    moduleId: module.id,//relative path  if not templateUrl: 'components/tasks/app.component.html'
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})
export class TasksComponent {
    constructor(private TaskService:TaskService){

    }
}