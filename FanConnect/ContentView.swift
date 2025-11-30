//
//  ContentView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//

import SwiftUI

enum AppView {
    case discovery
    case search
    case live
    case chats
    case eventDetail
    case chat
    case matchday
    case profile
}

struct ContentView: View {
    @State private var currentView: AppView = .discovery
    @State private var selectedEventId: String? = nil
    @State private var selectedChatId: String? = nil
    
    var body: some View {
        ZStack {
            Color(.systemGroupedBackground)
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Header
                headerView
                
                // Main Content
                mainContentView
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                
                // Bottom Navigation
                bottomNavigationView
            }
        }
    }
    
    // MARK: - Header View
    private var headerView: some View {
        HStack {
            // Logo and Title
            HStack(spacing: 8) {
                ZStack {
                    Circle()
                        .fill(Color.white)
                        .frame(width: 40, height: 40)
                    
                    Text("⚽")
                        .font(.title2)
                }
                
                Text("GoalGather")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
            }
            
            Spacer()
            
            // Profile Button
            Button(action: {
                currentView = .profile
            }) {
                ZStack {
                    Circle()
                        .fill(Color.white.opacity(0.2))
                        .frame(width: 40, height: 40)
                    
                    Image(systemName: "person")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                }
            }
        }
        .padding()
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
    
    // MARK: - Main Content View
    private var mainContentView: some View {
        Group {
            switch currentView {
            case .discovery:
                HomeView(onEventSelect: handleEventSelect)
                
            case .search:
                SearchView(onEventSelect: handleEventSelect)
                
            case .live:
                LiveView(onStartMatchday: handleStartMatchday)
                
            case .chats:
                ChatsView(onChatSelect: handleJoinChat)
                
            case .eventDetail:
                if let eventId = selectedEventId {
                    // Placeholder for EventDetail - to be implemented
                    VStack {
                        Text("Event Detail")
                            .font(.title2)
                            .padding()
                        Text("Event ID: \(eventId)")
                            .foregroundColor(.secondary)
                        Button("Back") {
                            currentView = .discovery
                        }
                        .padding()
                    }
                }
                
            case .chat:
                if let chatId = selectedChatId {
                    // Placeholder for GroupChat - to be implemented
                    VStack {
                        Text("Group Chat")
                            .font(.title2)
                            .padding()
                        Text("Chat ID: \(chatId)")
                            .foregroundColor(.secondary)
                        Button("Back") {
                            currentView = .chats
                        }
                        .padding()
                    }
                }
                
            case .matchday:
                if let eventId = selectedEventId {
                    // Placeholder for MatchdayMode - to be implemented
                    VStack {
                        Text("Matchday Mode")
                            .font(.title2)
                            .padding()
                        Text("Event ID: \(eventId)")
                            .foregroundColor(.secondary)
                        Button("Back") {
                            currentView = .live
                        }
                        .padding()
                    }
                }
                
            case .profile:
                // Placeholder for UserProfile - to be implemented
                VStack {
                    Text("User Profile")
                        .font(.title2)
                        .padding()
                    Button("Back") {
                        currentView = .discovery
                    }
                    .padding()
                }
            }
        }
    }
    
    // MARK: - Bottom Navigation View
    private var bottomNavigationView: some View {
        HStack(spacing: 0) {
            // Discover Tab
            TabButton(
                icon: "house.fill",
                label: "Discover",
                isSelected: currentView == .discovery,
                action: {
                    currentView = .discovery
                }
            )
            
            // Search Tab
            TabButton(
                icon: "magnifyingglass",
                label: "Search",
                isSelected: currentView == .search,
                action: {
                    currentView = .search
                }
            )
            
            // Live Tab
            TabButton(
                icon: "chart.line.uptrend.xyaxis",
                label: "Live",
                isSelected: currentView == .live || currentView == .matchday,
                action: {
                    currentView = .live
                }
            )
            
            // Chats Tab
            TabButton(
                icon: "message.fill",
                label: "Chats",
                isSelected: currentView == .chats || currentView == .chat,
                action: {
                    currentView = .chats
                }
            )
            
            // Profile Tab
            TabButton(
                icon: "person.fill",
                label: "Profile",
                isSelected: currentView == .profile,
                action: {
                    currentView = .profile
                }
            )
        }
        .frame(height: 70)
        .background(Color(.systemBackground))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color(.separator)),
            alignment: .top
        )
        .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: -2)
    }
    
    // MARK: - Helper Functions
    private func handleEventSelect(_ eventId: String) {
        selectedEventId = eventId
        currentView = .eventDetail
    }
    
    private func handleJoinChat(_ chatId: String) {
        selectedChatId = chatId
        currentView = .chat
    }
    
    private func handleStartMatchday(_ eventId: String) {
        selectedEventId = eventId
        currentView = .matchday
    }
}

// MARK: - Tab Button Component
struct TabButton: View {
    let icon: String
    let label: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 22))
                    .foregroundColor(isSelected ? .blue : .secondary)
                
                Text(label)
                    .font(.system(size: 11))
                    .foregroundColor(isSelected ? .blue : .secondary)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 70)
        }
    }
}

// MARK: - Preview
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}


