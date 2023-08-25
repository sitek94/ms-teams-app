import {
  CardFactory,
  MessagingExtensionAction,
  MessagingExtensionActionResponse,
  TeamsActivityHandler,
  TurnContext,
} from 'botbuilder'

export class TeamsBot extends TeamsActivityHandler {
  public async handleTeamsMessagingExtensionFetchTask(
    context: TurnContext,
    action: MessagingExtensionAction,
  ): Promise<MessagingExtensionActionResponse> {
    const card = CardFactory.adaptiveCard({
      version: '1.0.0',
      type: 'AdaptiveCard',
      body: [
        {
          type: 'TextBlock',
          size: 'Medium',
          weight: 'Bolder',
          text: 'Pick people:',
        },
        {
          type: 'Input.ChoiceSet',
          choices: [],
          'choices.data': {
            type: 'Data.Query',
            dataset: 'graph.microsoft.com/users',
          },
          id: 'people-picker',
          isMultiSelect: true,
        },
        {
          type: 'Input.Text',
          placeholder: 'Enter your message',
          isMultiline: true,
        },
        {
          type: 'Input.Toggle',
          title: 'Anonymous',
        },
      ],
      actions: [
        {
          type: 'Action.Submit',
          title: 'Submit',
        },
      ],
    })

    return {
      task: {
        type: 'continue',
        value: {
          title: 'Send message to your team members',
          card,
        },
      },
    }
  }
}
