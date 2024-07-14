import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable()
export class AlertService {

    constructor(private matSnackBar: MatSnackBar) {

    }

    success(message: string, duration = 3500) {
        this.matSnackBar.open(message, '', { duration, panelClass: ['alert', 'alert-success'] })
    }

    error(message: string, duration = 3500) {
        this.matSnackBar.open(message, '', { duration, panelClass: ['alert', 'alert-error'] })
    }

    message(message: string, duration = 3500) {
        this.matSnackBar.open(message, '', { duration, panelClass: ['alert'] })
    }
}