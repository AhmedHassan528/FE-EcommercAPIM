import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatService } from '../../../core/services/Chat-Services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ChatMessage {
  sender: 'You' | 'Assistant';
  text: string;
  timestamp: string;
  status: string;
  direction?: 'rtl' | 'ltr';
  formattedText?: SafeHtml;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      state('out', style({ transform: 'translateY(100%)' })),
      transition('out => in', animate('300ms ease-in-out')),
      transition('in => out', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ChatComponent {
  isChatOpen = false;
  message = '';

  // 🔥 هنا بنبدّأ conversation فيها system instruction
  messages: ChatMessage[] = [
    {
      sender: 'Assistant',
      text: "🛒🤖 Hi! I'm ToyTrove AI Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Delivered',
      direction: 'ltr',
    },
  ];

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer) { }

  private detectDir(text: string) {
    return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text) ? 'rtl' : 'ltr';
  }

  private formatMessage(text: string): SafeHtml {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(
      text.replace(/\n/g, '<br/>')
    );
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.message.trim()) return;

    // 1️⃣ push user message
    this.messages.push({
      sender: 'You',
      text: this.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent',
      direction: this.detectDir(this.message),
    });

    // 2️⃣ Build full history for the API
    const history = this.messages.map((m) => ({
      role: m.sender === 'You' ? 'user' : 'assistant',
      content: m.text,
    }));

    // 3️⃣ Send to Azure APIM
    this.chatService.sendToAzureModel(history).subscribe({
      next: (res) => {
        const content =
          res?.choices?.[0]?.message?.content ||
          'No response.';

        const msg: ChatMessage = {
          sender: 'Assistant',
          text: content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'Delivered',
          direction: this.detectDir(content),
          formattedText: this.formatMessage(content),
        };

        this.messages.push(msg);

        setTimeout(() => {
          const el = document.querySelector('.overflow-y-auto');
          if (el) el.scrollTop = el.scrollHeight;
        }, 50);
      },

      error: () => {
        this.messages.push({
          sender: 'Assistant',
          text: '❌ Something went wrong, please try again later.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'Delivered',
          direction: 'ltr',
        });
      },
    });

    this.message = '';
  }
}
