import { Component } from "@angular/core";

@Component({
    selector: 'vrs-newsletter-form',
    template: `
<form class="subscription-form" action="https://suomen-luonnonsuojeluliitto.creamailer.fi/tilaa/kmhyymE4U5T3w" method="POST">
    <input name="redirect" type="hidden" value="https://vieraslajit-dev.laji.fi/kansalaistoiminta/i-545">
    <div>
        <label class="email-label" for="userEmail">Sähköpostiosoite:</label><input class="email-input" type="text" name="userEmail" id="userEmail" required>
    </div>
    <div class="subscription-permission">
        <input type="checkbox" name="subscribePermission" id="subscribePermission" required><label for="subscribePermission">Kyllä, tilaan uutiskirjeen</label>
    </div>
    <input class="btn vrs-button primary" type="submit" value="Tilaa uutiskirje">
</form>
    `, styleUrls: ['./newsletter-form.component.scss']
})
export class NewsletterFormComponent {
    constructor() {}
}
