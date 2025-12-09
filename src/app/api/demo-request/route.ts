import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface DemoRequest {
  name: string;
  email: string;
  phone: string;
  organization: string;
  organizationType: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoRequest = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'organization', 'organizationType'];
    for (const field of requiredFields) {
      if (!body[field as keyof DemoRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Initialize ZAI SDK for additional processing
    const zai = await ZAI.create();

    // Create a summary of the demo request for internal processing
    const requestSummary = `
New Demo Request Received:

Contact Information:
- Name: ${body.name}
- Email: ${body.email}
- Phone: ${body.phone}
- Organization: ${body.organization}
- Organization Type: ${body.organizationType}

Message: ${body.message || 'No additional message provided'}

Request Date: ${new Date().toISOString()}
    `.trim();

    // Use AI to categorize and prioritize the lead
    const categorizationPrompt = `
    Categorize this healthcare demo request and assign a priority level (High, Medium, Low) based on the information provided:

    ${requestSummary}

    Respond with a JSON object containing:
    - category: (hospital, clinic, laboratory, specialty, other)
    - priority: (High, Medium, Low)
    - estimatedSize: (Small, Medium, Large, Enterprise)
    - followUpTiming: (Immediate, Within 1 week, Within 2 weeks, Within 1 month)
    - notes: brief reasoning for categorization
    `;

    const categorization = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a healthcare sales assistant who categorizes demo requests. Respond only with valid JSON.'
        },
        {
          role: 'user',
          content: categorizationPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 300
    });

    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(categorization.choices[0]?.message?.content || '{}');
    } catch (error) {
      console.error('Failed to parse AI categorization:', error);
      aiAnalysis = {
        category: body.organizationType,
        priority: 'Medium',
        estimatedSize: 'Medium',
        followUpTiming: 'Within 1 week',
        notes: 'AI categorization failed, using defaults'
      };
    }

    // Log the request for internal tracking
    console.log('Demo Request Received:', {
      timestamp: new Date().toISOString(),
      request: body,
      aiAnalysis
    });

    // Generate a personalized follow-up email draft
    const emailDraftPrompt = `
    Generate a professional follow-up email for this healthcare demo request:

    Contact: ${body.name} from ${body.organization}
    Organization Type: ${body.organizationType}
    Message: ${body.message || 'No additional message provided'}
    Priority: ${aiAnalysis.priority}
    Category: ${aiAnalysis.category}

    Create a personalized email that:
    1. Acknowledges their specific organization type
    2. Mentions relevant features for their needs
    3. Suggests specific demo focus areas
    4. Provides next steps
    5. Maintains professional healthcare industry tone

    Return as JSON with subject and body fields.
    `;

    const emailDraft = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a healthcare sales representative. Generate professional, personalized email responses. Return only valid JSON.'
        },
        {
          role: 'user',
          content: emailDraftPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    let emailContent;
    try {
      emailContent = JSON.parse(emailDraft.choices[0]?.message?.content || '{}');
    } catch (error) {
      console.error('Failed to parse email draft:', error);
      emailContent = {
        subject: `Your Medical Cloud Systems Demo Request`,
        body: `Thank you for your interest in Medical Cloud Systems. We have received your demo request and will contact you shortly to schedule a personalized demonstration.`
      };
    }

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send to CRM (Salesforce, HubSpot, etc.)
    // 3. Send confirmation email to customer
    // 4. Create calendar event for sales team
    // 5. Send Slack/Teams notification

    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully',
      requestId: `REQ-${Date.now()}`,
      estimatedResponseTime: 'Within 2 business hours',
      nextSteps: [
        'Our sales team will review your request',
        'You will receive a confirmation email shortly',
        'A specialist will contact you to schedule your personalized demo'
      ],
      emailDraft: emailContent // Include for internal use
    });

  } catch (error) {
    console.error('Demo request processing error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process demo request. Please try again or call our sales team directly.'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for demo request status (optional)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Demo request API is operational',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}