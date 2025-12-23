import type { Thread, Note, GeneratedMarkdown } from '@/types';

// Mock Threads
export const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'Product Ideas',
    description: 'Brainstorming and collecting ideas for new product features',
    keywords: ['product', 'features', 'ideas', 'roadmap', 'innovation'],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-12-01T14:30:00Z',
    noteCount: 6,
    color: '#3B82F6', // Blue
  },
  {
    id: 'thread-2',
    title: 'Meeting Notes',
    description: 'Notes from team meetings, standups, and retrospectives',
    keywords: ['meetings', 'team', 'standup', 'retrospective', 'action-items'],
    createdAt: '2025-11-05T09:00:00Z',
    updatedAt: '2025-11-28T16:00:00Z',
    noteCount: 4,
    color: '#10B981', // Green
  },
  {
    id: 'thread-3',
    title: 'Research & Links',
    description: 'Interesting articles, research papers, and useful resources',
    keywords: ['research', 'articles', 'links', 'resources', 'learning'],
    createdAt: '2025-11-10T11:00:00Z',
    updatedAt: '2025-12-02T10:15:00Z',
    noteCount: 5,
    color: '#8B5CF6', // Purple
  },
  {
    id: 'thread-4',
    title: 'Quick Thoughts',
    description: 'Random ideas, observations, and fleeting thoughts',
    keywords: ['thoughts', 'ideas', 'random', 'notes'],
    createdAt: '2025-11-15T14:00:00Z',
    updatedAt: '2025-11-30T12:00:00Z',
    noteCount: 3,
    color: '#F59E0B', // Amber
  },
];

// Mock Notes
export const mockNotes: Note[] = [
  // Product Ideas thread
  {
    id: 'note-1',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'sarah@company.com',
      subject: 'Feature idea: Dark mode support',
      receivedAt: '2025-11-15T09:30:00Z',
      messageId: 'msg-001',
    },
    content: {
      plainText: 'I think we should add dark mode support to the app. Many users have been requesting it, and it would improve the user experience especially for night-time usage. We could use CSS variables for theming.',
      extractedText: 'I think we should add dark mode support to the app. Many users have been requesting it, and it would improve the user experience especially for night-time usage. We could use CSS variables for theming.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.95,
      reasoning: 'This note discusses adding a new feature to the product',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-15T09:30:05Z',
    },
    createdAt: '2025-11-15T09:30:05Z',
    updatedAt: '2025-11-15T09:30:05Z',
  },
  {
    id: 'note-2',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'john@company.com',
      subject: 'User feedback: Export to PDF',
      receivedAt: '2025-11-20T14:00:00Z',
      messageId: 'msg-002',
    },
    content: {
      plainText: 'Got feedback from 3 enterprise customers asking for PDF export functionality. This would be a great addition for their reporting needs. We could use a library like jsPDF or puppeteer.',
      extractedText: 'Got feedback from 3 enterprise customers asking for PDF export functionality. This would be a great addition for their reporting needs. We could use a library like jsPDF or puppeteer.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.92,
      reasoning: 'User feedback about a new product feature',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-20T14:00:05Z',
    },
    createdAt: '2025-11-20T14:00:05Z',
    updatedAt: '2025-11-20T14:00:05Z',
  },
  {
    id: 'note-3',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'emma@company.com',
      subject: 'Idea: Collaborative editing',
      receivedAt: '2025-11-25T10:30:00Z',
      messageId: 'msg-003',
    },
    content: {
      plainText: 'What if we added real-time collaborative editing? Think Google Docs style. We could use WebSockets or a service like Pusher. Would be a game-changer for team workflows.',
      extractedText: 'What if we added real-time collaborative editing? Think Google Docs style. We could use WebSockets or a service like Pusher. Would be a game-changer for team workflows.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.88,
      reasoning: 'Brainstorming a significant new feature',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-25T10:30:05Z',
    },
    createdAt: '2025-11-25T10:30:05Z',
    updatedAt: '2025-11-25T10:30:05Z',
  },
  {
    id: 'note-4',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'alex@company.com',
      subject: 'Mobile app considerations',
      receivedAt: '2025-11-28T16:00:00Z',
      messageId: 'msg-004',
    },
    content: {
      plainText: 'With our growing mobile user base, should we consider a native mobile app? React Native could let us reuse a lot of our existing code. Worth discussing in the next planning meeting.',
      extractedText: 'With our growing mobile user base, should we consider a native mobile app? React Native could let us reuse a lot of our existing code. Worth discussing in the next planning meeting.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.91,
      reasoning: 'Product strategy and feature discussion',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-28T16:00:05Z',
    },
    createdAt: '2025-11-28T16:00:05Z',
    updatedAt: '2025-11-28T16:00:05Z',
  },
  {
    id: 'note-5',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'lisa@company.com',
      subject: 'Analytics dashboard idea',
      receivedAt: '2025-12-01T11:00:00Z',
      messageId: 'msg-005',
    },
    content: {
      plainText: 'Users are asking for better analytics. A visual dashboard with charts showing usage patterns, most active times, popular features, etc. We could use Chart.js or Recharts.',
      extractedText: 'Users are asking for better analytics. A visual dashboard with charts showing usage patterns, most active times, popular features, etc. We could use Chart.js or Recharts.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.94,
      reasoning: 'New feature idea based on user requests',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-12-01T11:00:05Z',
    },
    createdAt: '2025-12-01T11:00:05Z',
    updatedAt: '2025-12-01T11:00:05Z',
  },
  {
    id: 'note-6',
    threadId: 'thread-1',
    source: 'email',
    emailMetadata: {
      from: 'mike@company.com',
      subject: 'API rate limiting feature',
      receivedAt: '2025-12-01T14:30:00Z',
      messageId: 'msg-006',
    },
    content: {
      plainText: 'For the API, we should implement proper rate limiting to prevent abuse and ensure fair usage. Could use Redis for tracking request counts. Important for when we open the API to third-party developers.',
      extractedText: 'For the API, we should implement proper rate limiting to prevent abuse and ensure fair usage. Could use Redis for tracking request counts. Important for when we open the API to third-party developers.',
    },
    classification: {
      threadId: 'thread-1',
      confidence: 0.89,
      reasoning: 'Technical feature for API infrastructure',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-12-01T14:30:05Z',
    },
    createdAt: '2025-12-01T14:30:05Z',
    updatedAt: '2025-12-01T14:30:05Z',
  },

  // Meeting Notes thread
  {
    id: 'note-7',
    threadId: 'thread-2',
    source: 'email',
    emailMetadata: {
      from: 'team@company.com',
      subject: 'Sprint Planning - Nov 18',
      receivedAt: '2025-11-18T15:00:00Z',
      messageId: 'msg-007',
    },
    content: {
      plainText: 'Sprint Planning Meeting\n\nAttendees: Sarah, John, Emma, Alex\n\nDecisions:\n- Focus on authentication improvements this sprint\n- Add 2FA support\n- Refactor user settings page\n\nAction items:\n- Sarah: Design 2FA flow\n- John: Backend implementation\n- Emma: Frontend components\n- Alex: Testing and documentation',
      extractedText: 'Sprint Planning Meeting. Attendees: Sarah, John, Emma, Alex. Decisions: Focus on authentication improvements this sprint, Add 2FA support, Refactor user settings page. Action items: Sarah design 2FA flow, John backend implementation, Emma frontend components, Alex testing and documentation.',
    },
    classification: {
      threadId: 'thread-2',
      confidence: 0.97,
      reasoning: 'Meeting notes with action items and decisions',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-18T15:00:05Z',
    },
    createdAt: '2025-11-18T15:00:05Z',
    updatedAt: '2025-11-18T15:00:05Z',
  },
  {
    id: 'note-8',
    threadId: 'thread-2',
    source: 'email',
    emailMetadata: {
      from: 'team@company.com',
      subject: 'Daily Standup Notes - Nov 22',
      receivedAt: '2025-11-22T10:00:00Z',
      messageId: 'msg-008',
    },
    content: {
      plainText: 'Quick standup notes:\n\nJohn: Finished API authentication endpoints, starting on 2FA backend\nEmma: Completed settings page redesign, needs review\nSarah: 2FA user flow designs ready, shared in Figma\nAlex: Setting up test environment\n\nBlockers: None\nNext: Code review session at 2pm',
      extractedText: 'Quick standup notes. John finished API authentication endpoints, starting on 2FA backend. Emma completed settings page redesign, needs review. Sarah 2FA user flow designs ready, shared in Figma. Alex setting up test environment. Blockers: None. Next: Code review session at 2pm.',
    },
    classification: {
      threadId: 'thread-2',
      confidence: 0.96,
      reasoning: 'Daily standup meeting notes',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-22T10:00:05Z',
    },
    createdAt: '2025-11-22T10:00:05Z',
    updatedAt: '2025-11-22T10:00:05Z',
  },
  {
    id: 'note-9',
    threadId: 'thread-2',
    source: 'email',
    emailMetadata: {
      from: 'sarah@company.com',
      subject: 'Retrospective notes - Sprint 23',
      receivedAt: '2025-11-25T16:00:00Z',
      messageId: 'msg-009',
    },
    content: {
      plainText: 'Sprint 23 Retrospective\n\nWhat went well:\n- Great collaboration on the auth features\n- Code reviews were thorough and helpful\n- Shipped everything on time\n\nWhat could improve:\n- Need better documentation during development\n- More unit tests before PR\n- Earlier design feedback\n\nAction items:\n- Create documentation template\n- Add test coverage check to CI\n- Schedule design sync at sprint start',
      extractedText: 'Sprint 23 Retrospective. What went well: Great collaboration on the auth features, Code reviews were thorough and helpful, Shipped everything on time. What could improve: Need better documentation during development, More unit tests before PR, Earlier design feedback. Action items: Create documentation template, Add test coverage check to CI, Schedule design sync at sprint start.',
    },
    classification: {
      threadId: 'thread-2',
      confidence: 0.98,
      reasoning: 'Sprint retrospective with improvements and action items',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-25T16:00:05Z',
    },
    createdAt: '2025-11-25T16:00:05Z',
    updatedAt: '2025-11-25T16:00:05Z',
  },
  {
    id: 'note-10',
    threadId: 'thread-2',
    source: 'email',
    emailMetadata: {
      from: 'alex@company.com',
      subject: 'Architecture review meeting',
      receivedAt: '2025-11-28T14:00:00Z',
      messageId: 'msg-010',
    },
    content: {
      plainText: 'Architecture Review - Authentication System\n\nDiscussed:\n- Current auth flow and pain points\n- Security best practices\n- Scalability considerations\n\nDecisions:\n- Move to JWT with refresh tokens\n- Implement rate limiting on auth endpoints\n- Add session management dashboard\n\nNext steps:\n- Create technical spec doc\n- Review with security team\n- Plan migration strategy',
      extractedText: 'Architecture Review - Authentication System. Discussed: Current auth flow and pain points, Security best practices, Scalability considerations. Decisions: Move to JWT with refresh tokens, Implement rate limiting on auth endpoints, Add session management dashboard. Next steps: Create technical spec doc, Review with security team, Plan migration strategy.',
    },
    classification: {
      threadId: 'thread-2',
      confidence: 0.95,
      reasoning: 'Technical architecture meeting notes',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-28T14:00:05Z',
    },
    createdAt: '2025-11-28T14:00:05Z',
    updatedAt: '2025-11-28T14:00:05Z',
  },

  // Research & Links thread
  {
    id: 'note-11',
    threadId: 'thread-3',
    source: 'email',
    emailMetadata: {
      from: 'emma@company.com',
      subject: 'Great article on React performance',
      receivedAt: '2025-11-16T11:00:00Z',
      messageId: 'msg-011',
    },
    content: {
      plainText: `Found this excellent article on React performance optimization:
https://example.com/react-performance-2025

Key takeaways:
- Use React.memo wisely, don't over-optimize
- Code splitting can reduce initial bundle size by 40%
- Virtual scrolling for long lists is essential
- Consider using Suspense for better loading states

We should apply some of these techniques to our dashboard.`,
      extractedText: `Found this excellent article on React performance optimization: https://example.com/react-performance-2025. Key takeaways: Use React.memo wisely don't over-optimize, Code splitting can reduce initial bundle size by 40%, Virtual scrolling for long lists is essential, Consider using Suspense for better loading states. We should apply some of these techniques to our dashboard.`,
    },
    classification: {
      threadId: 'thread-3',
      confidence: 0.93,
      reasoning: 'Research article with actionable insights',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-16T11:00:05Z',
    },
    createdAt: '2025-11-16T11:00:05Z',
    updatedAt: '2025-11-16T11:00:05Z',
  },
  {
    id: 'note-12',
    threadId: 'thread-3',
    source: 'email',
    emailMetadata: {
      from: 'john@company.com',
      subject: 'TypeScript 5.3 new features',
      receivedAt: '2025-11-20T09:30:00Z',
      messageId: 'msg-012',
    },
    content: {
      plainText: 'TypeScript 5.3 just released with some cool features:\n- Import attributes\n- Better type narrowing\n- Performance improvements\n\nDocs: https://devblogs.microsoft.com/typescript/announcing-typescript-5-3\n\nWe should upgrade when stable. The type narrowing improvements would help with our form validation code.',
      extractedText: 'TypeScript 5.3 just released with some cool features: Import attributes, Better type narrowing, Performance improvements. Docs: https://devblogs.microsoft.com/typescript/announcing-typescript-5-3. We should upgrade when stable. The type narrowing improvements would help with our form validation code.',
    },
    classification: {
      threadId: 'thread-3',
      confidence: 0.91,
      reasoning: 'Technical resource about TypeScript updates',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-20T09:30:05Z',
    },
    createdAt: '2025-11-20T09:30:05Z',
    updatedAt: '2025-11-20T09:30:05Z',
  },
  {
    id: 'note-13',
    threadId: 'thread-3',
    source: 'email',
    emailMetadata: {
      from: 'sarah@company.com',
      subject: 'UX research: onboarding best practices',
      receivedAt: '2025-11-24T14:00:00Z',
      messageId: 'msg-013',
    },
    content: {
      plainText: 'Interesting UX research on user onboarding:\nhttps://uxdesign.com/onboarding-best-practices-2025\n\nKey findings:\n- Progressive disclosure beats lengthy tutorials\n- Contextual tooltips are more effective than tours\n- First value should be delivered within 2 minutes\n- Allow skipping onboarding but make it accessible later\n\nLet\'s review our current onboarding flow against these principles.',
      extractedText: 'Interesting UX research on user onboarding: https://uxdesign.com/onboarding-best-practices-2025. Key findings: Progressive disclosure beats lengthy tutorials, Contextual tooltips are more effective than tours, First value should be delivered within 2 minutes, Allow skipping onboarding but make it accessible later. Lets review our current onboarding flow against these principles.',
    },
    classification: {
      threadId: 'thread-3',
      confidence: 0.94,
      reasoning: 'UX research relevant to product improvement',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-24T14:00:05Z',
    },
    createdAt: '2025-11-24T14:00:05Z',
    updatedAt: '2025-11-24T14:00:05Z',
  },
  {
    id: 'note-14',
    threadId: 'thread-3',
    source: 'email',
    emailMetadata: {
      from: 'lisa@company.com',
      subject: 'Database indexing guide',
      receivedAt: '2025-11-29T10:00:00Z',
      messageId: 'msg-014',
    },
    content: {
      plainText: 'Comprehensive guide on database indexing strategies:\nhttps://use-the-index-luke.com\n\nThis helped me understand why some of our queries were slow. The section on composite indexes was particularly useful.\n\nAction: Audit our current indexes and optimize based on actual query patterns.',
      extractedText: 'Comprehensive guide on database indexing strategies: https://use-the-index-luke.com. This helped me understand why some of our queries were slow. The section on composite indexes was particularly useful. Action: Audit our current indexes and optimize based on actual query patterns.',
    },
    classification: {
      threadId: 'thread-3',
      confidence: 0.92,
      reasoning: 'Technical resource for database optimization',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-29T10:00:05Z',
    },
    createdAt: '2025-11-29T10:00:05Z',
    updatedAt: '2025-11-29T10:00:05Z',
  },
  {
    id: 'note-15',
    threadId: 'thread-3',
    source: 'email',
    emailMetadata: {
      from: 'mike@company.com',
      subject: 'Security audit checklist',
      receivedAt: '2025-12-02T10:15:00Z',
      messageId: 'msg-015',
    },
    content: {
      plainText: 'OWASP Security Checklist for Web Apps:\nhttps://owasp.org/www-project-web-security-testing-guide/\n\nWe should run through this before our next major release. Covers:\n- Authentication & Session Management\n- Input Validation\n- Cryptography\n- Error Handling\n- Configuration Management\n\nScheduling a security review session for next week.',
      extractedText: 'OWASP Security Checklist for Web Apps: https://owasp.org/www-project-web-security-testing-guide/. We should run through this before our next major release. Covers: Authentication & Session Management, Input Validation, Cryptography, Error Handling, Configuration Management. Scheduling a security review session for next week.',
    },
    classification: {
      threadId: 'thread-3',
      confidence: 0.96,
      reasoning: 'Security resource and action item',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-12-02T10:15:05Z',
    },
    createdAt: '2025-12-02T10:15:05Z',
    updatedAt: '2025-12-02T10:15:05Z',
  },

  // Quick Thoughts thread
  {
    id: 'note-16',
    threadId: 'thread-4',
    source: 'email',
    emailMetadata: {
      from: 'sarah@company.com',
      subject: 'Random thought',
      receivedAt: '2025-11-17T22:30:00Z',
      messageId: 'msg-016',
    },
    content: {
      plainText: 'What if we gamified the onboarding process? Like achievement badges for completing setup steps. Might make it more engaging, especially for less technical users.',
      extractedText: 'What if we gamified the onboarding process? Like achievement badges for completing setup steps. Might make it more engaging, especially for less technical users.',
    },
    classification: {
      threadId: 'thread-4',
      confidence: 0.85,
      reasoning: 'Quick idea that doesn\'t fit other specific threads',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-17T22:30:05Z',
    },
    createdAt: '2025-11-17T22:30:05Z',
    updatedAt: '2025-11-17T22:30:05Z',
  },
  {
    id: 'note-17',
    threadId: 'thread-4',
    source: 'email',
    emailMetadata: {
      from: 'alex@company.com',
      subject: 'Coffee thought ☕',
      receivedAt: '2025-11-23T08:15:00Z',
      messageId: 'msg-017',
    },
    content: {
      plainText: 'The best debugging tool is still console.log(). Fight me. 😄',
      extractedText: 'The best debugging tool is still console.log(). Fight me.',
    },
    classification: {
      threadId: 'thread-4',
      confidence: 0.73,
      reasoning: 'Casual observation about development',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-23T08:15:05Z',
    },
    createdAt: '2025-11-23T08:15:05Z',
    updatedAt: '2025-11-23T08:15:05Z',
  },
  {
    id: 'note-18',
    threadId: 'thread-4',
    source: 'email',
    emailMetadata: {
      from: 'emma@company.com',
      subject: 'Shower thought',
      receivedAt: '2025-11-30T12:00:00Z',
      messageId: 'msg-018',
    },
    content: {
      plainText: 'Why do we call them "edge cases" when they happen all the time in production? Should call them "surprisingly common cases".',
      extractedText: 'Why do we call them edge cases when they happen all the time in production? Should call them surprisingly common cases.',
    },
    classification: {
      threadId: 'thread-4',
      confidence: 0.79,
      reasoning: 'Humorous observation about software development',
      modelUsed: 'gemini-2.0-flash',
      classifiedAt: '2025-11-30T12:00:05Z',
    },
    createdAt: '2025-11-30T12:00:05Z',
    updatedAt: '2025-11-30T12:00:05Z',
  },
];

// Mock Generated Markdown
export const mockGeneratedMarkdown: GeneratedMarkdown[] = [
  {
    id: 'gen-1',
    threadId: 'thread-1',
    threadTitle: 'Product Ideas',
    generatedAt: '2025-11-26T10:00:00Z',
    modelUsed: 'gemini-2.5-pro',
    noteCount: 4,
    content: `# Product Ideas Summary

## Overview

This document synthesizes recent product ideas and feature requests collected from the team. These ideas represent opportunities to enhance our product offering and better serve our users.

## Feature Proposals

### 1. Dark Mode Support
**Requester**: Sarah (Nov 15)

Users have been consistently requesting dark mode functionality. This would:
- Improve user experience during night-time usage
- Reduce eye strain
- Follow modern UI/UX trends

**Implementation approach**: Use CSS variables for theming to make the transition seamless.

### 2. PDF Export Functionality
**Requester**: John (Nov 20)

Multiple enterprise customers have requested PDF export capabilities for reporting purposes. This represents a clear business need with revenue implications.

**Potential libraries**: jsPDF or Puppeteer

### 3. Real-time Collaborative Editing
**Requester**: Emma (Nov 25)

Google Docs-style collaborative editing could be a game-changer for team workflows.

**Technical considerations**:
- WebSockets implementation
- Alternative: Third-party service like Pusher
- Would require significant architectural changes

### 4. Mobile Application
**Requester**: Alex (Nov 28)

With growing mobile user base, a native mobile app deserves consideration.

**Approach**: React Native to maximize code reuse with existing web application.

## Prioritization Recommendations

1. **Quick wins**: Dark mode and PDF export
2. **Strategic**: Mobile app (requires market research)
3. **Long-term**: Collaborative editing (significant engineering investment)

## Next Steps

- Validate feature requests with user research
- Create technical specifications for prioritized features
- Estimate effort and resource requirements
- Present to stakeholders for final prioritization

---

*Generated on November 26, 2025 from 4 notes*
`,
  },
  {
    id: 'gen-2',
    threadId: 'thread-1',
    threadTitle: 'Product Ideas',
    generatedAt: '2025-12-01T15:00:00Z',
    modelUsed: 'gemini-2.5-pro',
    noteCount: 6,
    content: `# Product Ideas - Complete Summary

## Executive Summary

This document compiles all recent product ideas and feature requests from November-December 2025. Six distinct feature proposals have emerged, ranging from UI enhancements to infrastructure improvements.

## Proposed Features

### User Experience Enhancements

#### 1. Dark Mode Support
- **Status**: Highly requested
- **Impact**: Improved UX for night-time users
- **Technical approach**: CSS variables
- **Priority**: High (quick win)

#### 2. Analytics Dashboard
- **Requester**: Lisa (Dec 1)
- **Features**:
  - Usage pattern visualization
  - Active time tracking
  - Popular features analysis
- **Libraries**: Chart.js or Recharts
- **Priority**: Medium (adds value, moderate complexity)

#### 3. PDF Export
- **Drivers**: Enterprise customer requests
- **Use case**: Reporting needs
- **Priority**: High (revenue impact)

### Collaboration & Scaling

#### 4. Real-time Collaborative Editing
- **Vision**: Google Docs experience
- **Technologies**: WebSockets or Pusher
- **Impact**: Game-changer for teams
- **Priority**: Low (significant effort, unvalidated need)

#### 5. Native Mobile App
- **Driver**: Growing mobile usage
- **Approach**: React Native
- **Benefits**: Code reuse, native experience
- **Priority**: Medium (market-dependent)

### Infrastructure

#### 6. API Rate Limiting
- **Requester**: Mike (Dec 1)
- **Purpose**: Prevent abuse, ensure fair usage
- **Technology**: Redis
- **Importance**: Critical for public API launch
- **Priority**: High (prerequisite for API access)

## Implementation Roadmap

### Phase 1: Quick Wins (Q1 2026)
1. Dark mode
2. PDF export
3. API rate limiting

### Phase 2: Strategic Features (Q2 2026)
4. Analytics dashboard
5. Mobile app (if validated)

### Phase 3: Long-term Investments (Q3-Q4 2026)
6. Collaborative editing (if needed)

## Resource Requirements

- Frontend: 2 engineers
- Backend: 2 engineers
- Design: 1 designer
- Product: Ongoing validation and prioritization

## Success Metrics

- User adoption of new features
- Customer satisfaction scores
- Enterprise customer retention
- Mobile user engagement

---

*Generated on December 1, 2025 from 6 notes*
*Model: Gemini 2.5 Pro*
`,
  },
  {
    id: 'gen-3',
    threadId: 'thread-2',
    threadTitle: 'Meeting Notes',
    generatedAt: '2025-11-29T09:00:00Z',
    modelUsed: 'gemini-2.5-pro',
    noteCount: 4,
    content: `# Team Meeting Notes - November 2025

## Sprint 23 Overview

This document consolidates key meetings and decisions from Sprint 23, focused on authentication system improvements.

## Sprint Planning (Nov 18)

### Attendees
Sarah, John, Emma, Alex

### Sprint Goals
- Authentication improvements
- Two-factor authentication (2FA) implementation
- User settings page refactor

### Task Assignments
- **Sarah**: 2FA user flow design
- **John**: Backend implementation
- **Emma**: Frontend components
- **Alex**: Testing and documentation

## Daily Standup (Nov 22)

### Progress Updates
- **John**: Completed API authentication endpoints, transitioning to 2FA backend
- **Emma**: Finished settings page redesign, pending review
- **Sarah**: 2FA user flows ready in Figma
- **Alex**: Test environment configuration complete

### Status
- No blockers identified
- Code review session scheduled for 2pm

## Sprint Retrospective (Nov 25)

### Successes
✓ Excellent team collaboration on authentication features
✓ Thorough and helpful code reviews
✓ All deliverables shipped on time

### Areas for Improvement
- Documentation during development
- Unit test coverage before PRs
- Earlier design feedback cycles

### Action Items
1. Create documentation template
2. Add test coverage check to CI pipeline
3. Schedule design sync at sprint start

## Architecture Review (Nov 28)

### Authentication System Review

**Topics Discussed**:
- Current authentication flow analysis
- Security best practices
- Scalability requirements

**Decisions Made**:
1. Migrate to JWT with refresh tokens
2. Implement rate limiting on auth endpoints
3. Add session management dashboard

**Next Steps**:
- Draft technical specification document
- Security team review
- Plan migration strategy

## Key Takeaways

Sprint 23 demonstrated strong team execution with room for process improvements. The focus on authentication will strengthen our security posture and lay groundwork for future features.

### Team Health
- Collaboration: Excellent
- Delivery: On-track
- Technical debt: Managed

### Looking Ahead
- Continue authentication work
- Implement retrospective action items
- Maintain momentum on code quality

---

*Generated on November 29, 2025 from 4 meeting notes*
`,
  },
];

// Helper Functions
export const getAllThreads = (): Thread[] => {
  return mockThreads;
};

export const getThreadById = (id: string): Thread | undefined => {
  return mockThreads.find(thread => thread.id === id);
};

export const getNotesByThreadId = (threadId: string): Note[] => {
  return mockNotes.filter(note => note.threadId === threadId);
};

export const getNoteById = (id: string): Note | undefined => {
  return mockNotes.find(note => note.id === id);
};

export const getGeneratedMarkdownByThreadId = (threadId: string): GeneratedMarkdown[] => {
  return mockGeneratedMarkdown.filter(gen => gen.threadId === threadId);
};

export const getAllNotes = (): Note[] => {
  return mockNotes;
};

export const getAllGeneratedMarkdown = (): GeneratedMarkdown[] => {
  return mockGeneratedMarkdown;
};
