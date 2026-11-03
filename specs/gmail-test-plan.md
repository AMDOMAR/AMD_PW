# Gmail Web Application Test Plan

## Application Overview

Functional and usability test coverage for www.gmail.com. Live inspection confirmed that the public Gmail URL redirects signed-out users to Google's sign-in page, with an email/phone field, Next, Forgot email?, Create account, language selector, Help, Privacy, and Terms links. Authenticated mailbox workflows below require an authorized, dedicated test account and controlled test data; do not use personal/production accounts or real recipients. Each test is independent and begins with a clean browser session and the explicitly described fresh test-account state. Avoid making repeated or automated real authentication attempts.

## Test Scenarios

### 1. Public entry and account access

**Seed:** `tests\seed.spec.ts`

#### 1.1. Redirect signed-out visitor to Gmail sign-in

**File:** `tests\gmail\public-entry.spec.ts`

**Steps:**
  1. Starting state: clean browser profile with no Google account signed in. Navigate to https://www.gmail.com.
    - expect: The browser reaches Google's sign-in flow for Gmail.
    - expect: The page identifies the purpose as signing in to continue to Gmail and exposes an Email or phone field and a Next button.
  2. Inspect the sign-in page controls and footer without entering account data.
    - expect: Forgot email?, Create account, language selection, Help, Privacy, and Terms controls are available.
    - expect: The page remains usable without being signed in.

#### 1.2. Validate empty and malformed account identifiers

**File:** `tests\gmail\sign-in-validation.spec.ts`

**Steps:**
  1. Starting state: clean browser profile at Gmail's signed-out sign-in page. Leave Email or phone blank and select Next.
    - expect: The account identifier is required; the flow does not advance to password entry or Gmail.
    - expect: A visible and accessible validation message or field error is shown.
  2. Enter a malformed identifier such as an address with no domain separator and select Next.
    - expect: The malformed value is rejected with a clear validation message.
    - expect: The sign-in flow does not accept the malformed identifier or expose a mailbox.
  3. Correct the field to a syntactically valid, authorized test-account identifier and select Next; do not enter a password in this case.
    - expect: The next sign-in step is presented for the test account, or an equivalent account-recognition response is shown.
    - expect: No credentials are submitted beyond the authorized test identifier.

#### 1.3. Open and return from Forgot email flow

**File:** `tests\gmail\forgot-email-navigation.spec.ts`

**Steps:**
  1. Starting state: clean signed-out browser session on the Gmail sign-in page. Select Forgot email?.
    - expect: The account-recovery flow opens and presents the information needed to begin recovery.
    - expect: The flow does not disclose the existence or identity of accounts without appropriate verification.
  2. Use the available return/back navigation to return to the sign-in page.
    - expect: The Gmail sign-in page is restored and its primary controls are available.

#### 1.4. Open account creation from Gmail sign-in

**File:** `tests\gmail\create-account-navigation.spec.ts`

**Steps:**
  1. Starting state: clean signed-out browser session on the Gmail sign-in page. Select Create account.
    - expect: An account-creation choice or account-creation flow is presented.
    - expect: The user is not silently signed in or redirected into an existing mailbox.
  2. Return to the Gmail sign-in page without completing registration.
    - expect: The sign-in page is reachable again and remains functional.

#### 1.5. Change sign-in page language

**File:** `tests\gmail\language-selector.spec.ts`

**Steps:**
  1. Starting state: clean signed-out browser session on the Gmail sign-in page in its default locale. Open the language selector and choose another supported locale.
    - expect: The selected locale is applied to the page labels and controls, or the page reloads in the selected locale.
    - expect: The sign-in form remains available and correctly labeled after the language change.
  2. Restore the default locale.
    - expect: The page returns to the default locale without losing access to the sign-in controls.

#### 1.6. Sign in to an authorized fresh test account

**File:** `tests\gmail\authenticated-entry.spec.ts`

**Steps:**
  1. Starting state: clean browser profile; use only credentials from the approved secure test fixture for a dedicated Gmail test account with no user data. Navigate to Gmail, enter the fixture identifier, and continue.
    - expect: The account identifier is accepted and the next authentication step is displayed.
  2. Complete the supported authentication flow with the approved test fixture, including any required second factor; do not bypass account protections.
    - expect: Authentication succeeds only after valid credentials and required verification.
    - expect: The browser reaches the test account's Gmail mailbox and does not expose another account's data.

### 2. Mailbox, message, and organization workflows

**Seed:** `tests\seed.spec.ts`

#### 2.1. Load a fresh test mailbox and navigate mailbox folders

**File:** `tests\gmail\inbox-load.spec.ts`

**Steps:**
  1. Starting state: clean browser session authenticated to a dedicated test account whose inbox, drafts, sent, spam, and trash are empty. Open Gmail.
    - expect: The mailbox loads without a blocking error and displays its primary navigation and message area.
    - expect: The empty inbox is clearly represented when there are no messages.
    - expect: Inbox, Sent, Drafts, Spam, and Trash navigation destinations are reachable; exact labels may vary by locale or configuration.
  2. Open each available mailbox folder in turn, then return to Inbox.
    - expect: Each folder opens the correct destination without showing messages from a different test account.
    - expect: Returning to Inbox restores the inbox view.

#### 2.2. Compose and send a plain-text message to a controlled test recipient

**File:** `tests\gmail\compose-send.spec.ts`

**Steps:**
  1. Starting state: clean test mailbox with no messages or drafts. Open Compose.
    - expect: A new message composer appears with recipient, subject, message body, and send controls.
  2. Enter the approved test recipient address, a unique subject, and a short plain-text body. Send the message.
    - expect: The message is sent successfully and a visible success confirmation is shown.
    - expect: The sent message appears in Sent with the intended recipient, subject, and body.
    - expect: No message is sent to any real or unapproved recipient.

#### 2.3. Validate missing and malformed message recipients

**File:** `tests\gmail\compose-validation.spec.ts`

**Steps:**
  1. Starting state: fresh test mailbox. Open Compose, enter a subject and body, leave recipient blank, and select Send.
    - expect: The message is not sent.
    - expect: The composer identifies the missing recipient and allows the user to correct it.
  2. Enter a malformed recipient address and attempt to send.
    - expect: The invalid recipient is rejected or clearly flagged before delivery.
    - expect: The composer preserves the draft content and no message is delivered.
  3. Close or discard the unsent test draft using the normal UI flow.
    - expect: The unsent message is not present in Sent.
    - expect: The draft is removed only after explicit discard confirmation, if confirmation is required.

#### 2.4. Save and resume a message draft

**File:** `tests\gmail\draft-persistence.spec.ts`

**Steps:**
  1. Starting state: fresh test mailbox with no drafts. Open Compose and enter a controlled test recipient, subject, and body without sending.
    - expect: The composed content is retained while the composer is open.
  2. Close the composer using its close control, then open Drafts and reopen the message.
    - expect: The draft is saved and appears in Drafts.
    - expect: Recipient, subject, and body are retained accurately after reopening.
  3. Discard the draft using the normal Gmail UI flow.
    - expect: The discarded draft disappears from Drafts and is not present in Sent.

#### 2.5. Receive and open a controlled test message

**File:** `tests\gmail\receive-and-read.spec.ts`

**Steps:**
  1. Starting state: dedicated test recipient mailbox with a clean inbox. From a separate approved test sender, send one uniquely identifiable message to the test recipient; use only controlled addresses.
    - expect: The message becomes available in the recipient inbox within the expected delivery interval.
    - expect: The inbox row shows the correct sender and subject.
  2. Open the received message and inspect its body.
    - expect: The correct message opens and its body is readable.
    - expect: The message changes from unread to read, and the inbox unread count updates accordingly.

#### 2.6. Search messages by unique sender, subject, and text

**File:** `tests\gmail\search.spec.ts`

**Steps:**
  1. Starting state: test mailbox contains at least two controlled messages with unique, known sender, subject, and body text, plus one nonmatching message.
    - expect: The prepared test data is isolated to the test account.
  2. Search for the unique subject of one message, then search for its sender, then a unique body term.
    - expect: Each query returns the expected matching message(s) and excludes known nonmatches.
    - expect: Selecting a result opens the corresponding message.
    - expect: Clearing the query restores the normal mailbox list.
  3. Search for a unique string known not to exist in the test mailbox.
    - expect: A clear no-results state appears and no unrelated message is presented as a match.

#### 2.7. Archive and restore a test message

**File:** `tests\gmail\archive-restore.spec.ts`

**Steps:**
  1. Starting state: inbox contains one controlled test message with a unique subject. Select or open that message and choose Archive.
    - expect: The message is removed from Inbox and a success confirmation is displayed when applicable.
    - expect: The message remains available in All Mail or search and is not deleted.
  2. Locate the archived message and move it back to Inbox.
    - expect: The message reappears in Inbox with its original sender, subject, and content intact.

#### 2.8. Move a test message to Trash and restore it

**File:** `tests\gmail\delete-restore.spec.ts`

**Steps:**
  1. Starting state: inbox contains one controlled test message with a unique subject. Delete the message using Gmail's normal action.
    - expect: The message is removed from Inbox and appears in Trash.
    - expect: The message is not permanently deleted by the initial delete action.
  2. Open Trash and move the test message back to Inbox.
    - expect: The restored message appears in Inbox with content intact and is no longer in Trash.

#### 2.9. Star and unstar a test message

**File:** `tests\gmail\star-message.spec.ts`

**Steps:**
  1. Starting state: inbox contains one unstarred controlled test message. Star the message from the message list.
    - expect: The star state changes visibly and is exposed accessibly.
  2. Open the Starred view and then unstar the message.
    - expect: The message is present while starred and is removed from the Starred view after un-starring.
    - expect: The message remains in Inbox and its content is unchanged.

#### 2.10. Create a label and apply or remove it

**File:** `tests\gmail\label-message.spec.ts`

**Steps:**
  1. Starting state: test mailbox has one controlled message and no custom label with the chosen unique test name. Create the label and apply it to the message.
    - expect: The custom label is created and is visibly associated with the selected message.
    - expect: Opening the label shows the labeled message.
  2. Remove the label from the message, then delete the test label using the UI if supported.
    - expect: The message remains in Inbox and is no longer associated with the removed label.
    - expect: No unrelated message is affected.

#### 2.11. Send and receive a safe test attachment

**File:** `tests\gmail\attachment.spec.ts`

**Steps:**
  1. Starting state: clean test account and approved test sender/recipient. Compose a message to the controlled recipient and attach a small, harmless fixture file of an allowed type.
    - expect: The selected filename is displayed in the composer and the attachment is associated with the intended message.
  2. Send the message and open it from the controlled recipient account.
    - expect: The message is delivered with the attachment name and expected size/type shown.
    - expect: The attachment can be previewed or downloaded and its contents match the harmless fixture.
    - expect: No unexpected attachment is included.

#### 2.12. Change and restore a reversible display setting

**File:** `tests\gmail\settings-and-theme.spec.ts`

**Steps:**
  1. Starting state: fresh test mailbox with default display settings. Open Gmail settings or Quick settings.
    - expect: The settings panel opens and exposes supported display options.
  2. Change one reversible display option such as density or theme, close settings, and navigate to another mailbox view.
    - expect: The selected option is applied consistently across mailbox views.
  3. Restore the original option and reload the page.
    - expect: The default display option is restored and persists as expected after reload.

#### 2.13. Navigate sign-in and mailbox controls with keyboard and assistive semantics

**File:** `tests\gmail\keyboard-and-accessibility.spec.ts`

**Steps:**
  1. Starting state: clean signed-out session on Gmail sign-in page. Navigate interactive controls using Tab, Shift+Tab, and Enter without a mouse.
    - expect: Focus moves in a logical order, remains visible, and can activate the intended controls.
    - expect: Form fields and buttons expose meaningful accessible names and validation is announced or otherwise associated with the field.
  2. Starting state: fresh authorized test mailbox. Navigate primary mailbox controls and a message row using keyboard only.
    - expect: Primary navigation, search, compose, and message actions are keyboard reachable and have meaningful accessible names.
    - expect: Focus is not trapped in a dismissed dialog or composer.

#### 2.14. Use Gmail at narrow and wide viewport sizes

**File:** `tests\gmail\responsive-layout.spec.ts`

**Steps:**
  1. Starting state: fresh authorized test mailbox with one controlled message. Load Gmail at a desktop viewport, then resize to a narrow mobile-sized viewport.
    - expect: Primary controls and message content remain usable without unintended overlap or clipping.
    - expect: Responsive navigation remains discoverable and can be opened and closed.
  2. At both viewport sizes, open and close a message and composer, then return to the inbox.
    - expect: Core reading and composing flows remain operable at both sizes.
    - expect: No action causes content to become inaccessible off-screen without a usable scroll or navigation path.
