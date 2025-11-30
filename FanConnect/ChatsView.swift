//
//  ChatsView.swift
//  FanConnect
//
//  Created by user on 11/30/25.
//

import SwiftUI

// MARK: - Chat Preview Model
struct ChatPreview: Identifiable {
    let id: String
    let eventName: String
    let homeTeam: String
    let awayTeam: String
    let lastMessage: String
    let lastMessageTime: String
    let unreadCount: Int
    let members: Int
    let isActive: Bool
}

// MARK: - Chats View
struct ChatsView: View {
    @State private var activeChats: [ChatPreview] = mockActiveChats
    @State private var pastChats: [ChatPreview] = mockPastChats
    
    var onChatSelect: (String) -> Void
    
    init(onChatSelect: @escaping (String) -> Void) {
        self.onChatSelect = onChatSelect
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(alignment: .leading, spacing: 8) {
                    Text("Messages")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                    
                    Text("Your group chats and event discussions")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                
                // Active Chats Section
                activeChatsSection
                
                // Past Chats Section
                pastChatsSection
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Active Chats Section
    private var activeChatsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Section Header
            HStack {
                Circle()
                    .fill(Color.green)
                    .frame(width: 8, height: 8)
                Text("Active Chats")
                    .font(.headline)
                    .foregroundColor(.primary)
            }
            
            if activeChats.isEmpty {
                // Empty State
                VStack(spacing: 16) {
                    Image(systemName: "message.fill")
                        .font(.system(size: 32))
                        .foregroundColor(.secondary)
                        .frame(width: 64, height: 64)
                        .background(Color(.systemGray5))
                        .clipShape(Circle())
                    
                    Text("No active chats")
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text("Join an event to start chatting with fans")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
                .background(Color(.systemBackground))
                .cornerRadius(16)
            } else {
                // Active Chat Cards
                VStack(spacing: 12) {
                    ForEach(activeChats) { chat in
                        ChatCard(chat: chat, isActive: true) {
                            onChatSelect(chat.id)
                        }
                    }
                }
            }
        }
    }
    
    // MARK: - Past Chats Section
    private var pastChatsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Section Header
            HStack {
                Image(systemName: "clock")
                    .font(.system(size: 16))
                    .foregroundColor(.secondary)
                Text("Past Events")
                    .font(.headline)
                    .foregroundColor(.primary)
            }
            
            // Past Chat Cards
            VStack(spacing: 12) {
                ForEach(pastChats) { chat in
                    ChatCard(chat: chat, isActive: false) {
                        onChatSelect(chat.id)
                    }
                }
            }
        }
    }
}

// MARK: - Chat Card Component
struct ChatCard: View {
    let chat: ChatPreview
    let isActive: Bool
    var onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack(alignment: .top, spacing: 12) {
                // Avatar with Active Indicator
                ZStack(alignment: .topTrailing) {
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    gradient: Gradient(colors: isActive ? [Color.blue, Color.purple] : [Color(.systemGray4), Color(.systemGray5)]),
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 48, height: 48)
                        
                        Image(systemName: "message.fill")
                            .font(.system(size: 20))
                            .foregroundColor(.white)
                    }
                    
                    // Active Indicator
                    if isActive {
                        Circle()
                            .fill(Color.green)
                            .frame(width: 12, height: 12)
                            .overlay(
                                Circle()
                                    .stroke(Color(.systemBackground), lineWidth: 2)
                            )
                            .offset(x: 2, y: -2)
                    }
                }
                
                // Chat Info
                VStack(alignment: .leading, spacing: 6) {
                    // Header Row
                    HStack(alignment: .top) {
                        Text(chat.eventName)
                            .font(.headline)
                            .foregroundColor(.primary)
                            .lineLimit(1)
                        
                        Spacer()
                        
                        Text(chat.lastMessageTime)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    
                    // Last Message
                    Text(chat.lastMessage)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                    
                    // Footer Row
                    HStack {
                        HStack(spacing: 4) {
                            Image(systemName: "person.2")
                                .font(.system(size: 12))
                                .foregroundColor(.secondary)
                            Text("\(chat.members) members")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                        
                        // Unread Badge
                        if chat.unreadCount > 0 {
                            Text("\(chat.unreadCount)")
                                .font(.caption)
                                .fontWeight(.semibold)
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.blue)
                                .cornerRadius(10)
                        }
                    }
                }
            }
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .shadow(color: Color.black.opacity(0.05), radius: 4, x: 0, y: 2)
            .opacity(isActive ? 1.0 : 0.75)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - Mock Data
let mockActiveChats: [ChatPreview] = [
    ChatPreview(
        id: "1",
        eventName: "Man Utd vs Liverpool",
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        lastMessage: "Emma: This is my first time at Old Trafford! So excited 🎉",
        lastMessageTime: "2m ago",
        unreadCount: 3,
        members: 47,
        isActive: true
    ),
    ChatPreview(
        id: "2",
        eventName: "Real Madrid vs Bayern",
        homeTeam: "Real Madrid",
        awayTeam: "Bayern Munich",
        lastMessage: "Alex: See you all at the bar! 🍻",
        lastMessageTime: "15m ago",
        unreadCount: 1,
        members: 23,
        isActive: true
    )
]

let mockPastChats: [ChatPreview] = [
    ChatPreview(
        id: "3",
        eventName: "Chelsea vs Arsenal",
        homeTeam: "Chelsea",
        awayTeam: "Arsenal",
        lastMessage: "Sarah: Thanks everyone, great match!",
        lastMessageTime: "2 days ago",
        unreadCount: 0,
        members: 31,
        isActive: false
    ),
    ChatPreview(
        id: "4",
        eventName: "Barcelona vs Real Madrid",
        homeTeam: "Barcelona",
        awayTeam: "Real Madrid",
        lastMessage: "Mike: What a game! 🔥",
        lastMessageTime: "5 days ago",
        unreadCount: 0,
        members: 19,
        isActive: false
    )
]

// MARK: - Preview
struct ChatsView_Previews: PreviewProvider {
    static var previews: some View {
        ChatsView(onChatSelect: { chatId in
            print("Selected chat: \(chatId)")
        })
    }
}


