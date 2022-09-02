export interface LiveQuestionSubmissionStatusPayload {
    live_question_submission_status_event: LiveQuestionSubmissionStatusEvent;
}
export interface LiveQuestionSubmissionStatusEvent {
    client_subscription_id: string;
    broadcast_id: string;
    is_accepting_questions: boolean;
    live_question_count: number;
}
//# sourceMappingURL=live-question-submission-status.payload.d.ts.map