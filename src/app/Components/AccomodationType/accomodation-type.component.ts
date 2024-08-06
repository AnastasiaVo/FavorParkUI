import { Component, OnInit } from '@angular/core';
import { AccomodationTypeService } from '../../Services/accomodation-type.service';
import { AccomodationType } from '../../Models/AccomodationTypeModels/AccomodationType';
import { CreateAccomodationType } from '../../Models/AccomodationTypeModels/CreateAccomodationType';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-accomodation-type',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule
    ],
    templateUrl: './accomodation-type.component.html',
    //styleUrls: ['./accomodation-type.component.css']
})
export class AccomodationTypeComponent implements OnInit {
    accomodationTypes: AccomodationType[] = [];
    newAccomodationType: CreateAccomodationType = new CreateAccomodationType('', 0);
    editMode = false;
    selectedAccomodationType: AccomodationType | null = null;

    constructor(private accomodationTypeService: AccomodationTypeService) {}

    ngOnInit(): void {
        this.loadAccomodationTypes();
    }

    loadAccomodationTypes(): void {
        this.accomodationTypeService.getAllAccomodationTypes().subscribe((data) => {
            this.accomodationTypes = data;
        });
    }

    createAccomodationType(): void {
        this.accomodationTypeService.createAccomodationType(this.newAccomodationType).subscribe((data) => {
            this.accomodationTypes.push(data);
            this.newAccomodationType = new CreateAccomodationType('', 0);
        });
    }

    deleteAccomodationType(id: number): void {
        this.accomodationTypeService.deleteAccomodationType(id).subscribe(() => {
            this.accomodationTypes = this.accomodationTypes.filter((type) => type.Id !== id);
        });
    }

    editAccomodationType(type: AccomodationType): void {
        this.editMode = true;
        this.selectedAccomodationType = { ...type };
    }

    updateAccomodationType(id: number | undefined): void {
        if (this.selectedAccomodationType && id !== undefined) {
            this.accomodationTypeService.updateAccomodationType(id, this.selectedAccomodationType).subscribe((data) => {
                const index = this.accomodationTypes.findIndex((type) => type.Id === id);
                this.accomodationTypes[index] = data;
                this.cancelEdit();
            });
        }
    }

    cancelEdit(): void {
        this.editMode = false;
        this.selectedAccomodationType = null;
    }
}

