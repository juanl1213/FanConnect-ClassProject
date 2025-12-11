//
//  GroupChatView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

// MARK: - Message Model
struct ChatMessage: Identifiable {
    let id: String
    let senderId: String
    let senderName: String
    let senderAvatar: String
    let message: String
    let timestamp: String
    let isIcebreaker: Bool
    
    var isSystem: Bool {
        senderId == "system"
    }
    
    var isCurrentUser: Bool {
        senderId == "current-user"
    }
}

// MARK: - Group Chat View
struct GroupChatView: View {
    @State private var messages: [ChatMessage] = mockChatMessages
    @State private var inputValue: String = ""
    @FocusState private var isInputFocused: Bool
    
    let chatId: String
    var onBack: () -> Void
    
    let icebreakers = [
        "Where are you sitting?",
        "Who's bringing the banner?",
        "Want to meet before kickoff?",
        "Anyone need a ride?"
    ]
    
    init(chatId: String, onBack: @escaping () -> Void) {
        self.chatId = chatId
        self.onBack = onBack
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Chat Header
            chatHeader
            
            // Icebreaker Suggestions
            icebreakerSection
            
            // Messages
            messagesList
            
            // Safety Notice
            safetyNotice
            
            // Input Area
            inputArea
        }
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Chat Header
    private var chatHeader: some View {
        HStack(spacing: 12) {
            Button(action: onBack) {
                Image(systemName: "arrow.left")
                    .font(.system(size: 18))
                    .foregroundColor(.primary)
                    .frame(width: 36, height: 36)
            }
            
            VStack(alignment: .leading, spacing: 2) {
                Text("Man Utd vs Liverpool")
                    .font(.headline)
                    .foregroundColor(.primary)
                Text("47 members")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Button(action: {
                // Info action
            }) {
                Image(systemName: "info.circle")
                    .font(.system(size: 18))
                    .foregroundColor(.primary)
                    .frame(width: 36, height: 36)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color(.separator)),
            alignment: .bottom
        )
    }
    
    // MARK: - Icebreaker Section
    private var icebreakerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("💡 Icebreaker prompts:")
                .font(.caption2)
                .foregroundColor(.secondary)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(icebreakers, id: \.self) { icebreaker in
                        Button(action: {
                            inputValue = icebreaker
                            isInputFocused = true
                        }) {
                            Text(icebreaker)
                                .font(.caption)
                                .foregroundColor(.primary)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 6)
                                .background(Color(.systemBackground))
                                .cornerRadius(16)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 16)
                                        .stroke(Color(.separator), lineWidth: 1)
                                )
                        }
                    }
                }
                .padding(.horizontal, 4)
            }
        }
        .padding()
        .background(Color.blue.opacity(0.05))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color.blue.opacity(0.2)),
            alignment: .bottom
        )
    }
    
    // MARK: - Messages List
    private var messagesList: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: 16) {
                    ForEach(messages) { message in
                        MessageBubble(message: message)
                            .id(message.id)
                    }
                }
                .padding()
            }
            .onChange(of: messages.count) { _ in
                if let lastMessage = messages.last {
                    withAnimation {
                        proxy.scrollTo(lastMessage.id, anchor: .bottom)
                    }
                }
            }
        }
    }
    
    // MARK: - Safety Notice
    private var safetyNotice: some View {
        HStack {
            Image(systemName: "lock.fill")
                .font(.system(size: 12))
                .foregroundColor(.orange)
            Text("DMs from strangers will be disabled during matchday for your safety")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 8)
        .padding(.horizontal)
        .background(Color.yellow.opacity(0.1))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color.yellow.opacity(0.2)),
            alignment: .top
        )
    }
    
    // MARK: - Input Area
    private var inputArea: some View {
        HStack(spacing: 8) {
            Button(action: {
                // Image action
            }) {
                Image(systemName: "photo")
                    .font(.system(size: 18))
                    .foregroundColor(.secondary)
                    .frame(width: 36, height: 36)
            }
            
            TextField("Type a message...", text: $inputValue)
                .textFieldStyle(PlainTextFieldStyle())
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(Color(.systemGray5))
                .cornerRadius(20)
                .focused($isInputFocused)
                .onSubmit {
                    sendMessage()
                }
            
            Button(action: {
                // Emoji action
            }) {
                Image(systemName: "face.smiling")
                    .font(.system(size: 18))
                    .foregroundColor(.secondary)
                    .frame(width: 36, height: 36)
            }
            
            Button(action: sendMessage) {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.system(size: 32))
                    .foregroundColor(inputValue.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? .gray : .blue)
            }
            .disabled(inputValue.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
        .padding()
        .background(Color(.systemBackground))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color(.separator)),
            alignment: .top
        )
    }
    
    // MARK: - Actions
    private func sendMessage() {
        let trimmedMessage = inputValue.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedMessage.isEmpty else { return }
        
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        let timestamp = formatter.string(from: Date())
        
        let newMessage = ChatMessage(
            id: String(messages.count + 1),
            senderId: "current-user",
            senderName: "You",
            senderAvatar: "YU",
            message: trimmedMessage,
            timestamp: timestamp,
            isIcebreaker: false
        )
        
        withAnimation {
            messages.append(newMessage)
        }
        
        inputValue = ""
    }
}

// MARK: - Message Bubble
struct MessageBubble: View {
    let message: ChatMessage
    
    var body: some View {
        if message.isSystem {
            systemMessage
        } else {
            userMessage
        }
    }
    
    private var systemMessage: some View {
        HStack {
            Spacer()
            VStack(spacing: 0) {
                Text(message.message)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        message.isIcebreaker
                            ? Color.blue.opacity(0.1)
                            : Color(.systemGray5)
                    )
                    .cornerRadius(16)
            }
            Spacer()
        }
    }
    
    private var userMessage: some View {
        HStack(alignment: .bottom, spacing: 8) {
            if message.isCurrentUser {
                Spacer(minLength: 60)
            } else {
                // Avatar
                ZStack {
                    Circle()
                        .fill(
                            LinearGradient(
                                gradient: Gradient(colors: [Color.blue, Color.purple]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 32, height: 32)
                    
                    Text(message.senderAvatar)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                }
            }
            
            VStack(alignment: message.isCurrentUser ? .trailing : .leading, spacing: 4) {
                if !message.isCurrentUser {
                    Text(message.senderName)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                        .padding(.horizontal, 12)
                }
                
                Text(message.message)
                    .font(.subheadline)
                    .foregroundColor(message.isCurrentUser ? .white : .primary)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(
                        message.isCurrentUser
                            ? Color.blue
                            : Color(.systemBackground)
                    )
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(
                                message.isCurrentUser
                                    ? Color.clear
                                    : Color(.separator),
                                lineWidth: 1
                            )
                    )
                    .fixedSize(horizontal: false, vertical: true)
                
                Text(message.timestamp)
                    .font(.caption2)
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 12)
            }
            .frame(maxWidth: .infinity, alignment: message.isCurrentUser ? .trailing : .leading)
            
            if !message.isCurrentUser {
                Spacer(minLength: 60)
            }
        }
    }
}

// MARK: - Mock Data
let mockChatMessages: [ChatMessage] = [
    ChatMessage(
        id: "1",
        senderId: "system",
        senderName: "FanConnect",
        senderAvatar: "⚽",
        message: "Welcome to the Manchester United vs Liverpool match chat! Use these icebreakers to get started:",
        timestamp: "14:20",
        isIcebreaker: false
    ),
    ChatMessage(
        id: "2",
        senderId: "system",
        senderName: "Icebreaker",
        senderAvatar: "💬",
        message: "Where are you all sitting? Let's try to meet up!",
        timestamp: "14:21",
        isIcebreaker: true
    ),
    ChatMessage(
        id: "3",
        senderId: "1",
        senderName: "Sarah M.",
        senderAvatar: "SM",
        message: "I'm in the Stretford End! Section 127. Anyone nearby?",
        timestamp: "14:23",
        isIcebreaker: false
    ),
    ChatMessage(
        id: "4",
        senderId: "2",
        senderName: "James K.",
        senderAvatar: "JK",
        message: "I'm in 125! Right next to you Sarah 👋",
        timestamp: "14:24",
        isIcebreaker: false
    ),
    ChatMessage(
        id: "5",
        senderId: "5",
        senderName: "Mia T.",
        senderAvatar: "MT",
        message: "Anyone planning to grab food before the match? There's a great pub nearby",
        timestamp: "14:28",
        isIcebreaker: false
    ),
    ChatMessage(
        id: "6",
        senderId: "4",
        senderName: "David L.",
        senderAvatar: "DL",
        message: "I'm down! What time and where?",
        timestamp: "14:30",
        isIcebreaker: false
    ),
    ChatMessage(
        id: "7",
        senderId: "3",
        senderName: "Emma R.",
        senderAvatar: "ER",
        message: "This is my first time at Old Trafford! So excited 🎉",
        timestamp: "14:32",
        isIcebreaker: false
    )
]

// MARK: - Preview
struct GroupChatView_Previews: PreviewProvider {
    static var previews: some View {
        GroupChatView(chatId: "1", onBack: {
            print("Back tapped")
        })
    }
}

