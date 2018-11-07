import { Component, Output, EventEmitter } from "@angular/core";
import { InformalGroupComponent } from "./informal-group.component";

@Component({
    selector: 'vrs-informal-group-grid',
    template: `
    <div class="informal-groups">
        <vrs-informal-group [groupId]="'MVL.232'" [name]="'Hyönteiset'"     (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.27'" [name]="'Kalat'"           (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.21'" [name]="'Kasvit'"          (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.1'" [name]="'Linnut'"           (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.28'" [name]="'Madot'"           (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.26'" [name]="'Matelijat'"       (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>

        <vrs-informal-group [groupId]="'MVL.40'" [name]="'Nilviäiset'"      (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.2'" [name]="'Nisäkkäät'"        (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.233'" [name]="'Sienet'"         (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.37'" [name]="'Tuhatjalkaiset'"  (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.39'" [name]="'Äyriäiset'"       (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
        <vrs-informal-group [groupId]="'MVL.41'" [name]="'Muut'"            (selected)='onGroupSelect($event.group, $event.activeState)'></vrs-informal-group>
    </div>
    `,
    styles: [`
        .informal-groups {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    `]
})
export class InformalGroupGridComponent {
    @Output() informalGroupSelection: EventEmitter<string[]> = new EventEmitter<string[]>();

    private enabledGroupFilters: string[] = [];
    
    onGroupSelect(g: InformalGroupComponent, state: boolean) {
        if (state) {
            this.enabledGroupFilters.push(g.getGroupId());
        } else {
            // Create new array without disabled group
            let newEnabledGroupFilters: string[] = [];
            this.enabledGroupFilters.forEach((val) => {
                if (val !== g.getGroupId()) {
                    newEnabledGroupFilters.push(val);
                }
            });
            this.enabledGroupFilters = newEnabledGroupFilters;
        }
        this.informalGroupSelection.emit(this.enabledGroupFilters);
    }
}