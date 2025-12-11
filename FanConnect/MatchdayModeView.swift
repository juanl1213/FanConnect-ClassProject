//
//  MatchdayModeView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

// MARK: - Post Model
struct MatchdayPost: Identifiable {
    let id: String
    let userId: String
    let userName: String
    let userAvatar: String
    let content: String
    let image: String?
    let timestamp: String
    var likes: Int
    var comments: Int
    var isLiked: Bool
}

// MARK: - Matchday Mode View
struct MatchdayModeView: View {
    @State private var posts: [MatchdayPost] = mockMatchdayPosts
    @State private var newPostContent: String = ""
    @State private var showPostInput: Bool = false
    
    let eventId: String
    var onBack: () -> Void
    
    init(eventId: String, onBack: @escaping () -> Void) {
        self.eventId = eventId
        self.onBack = onBack
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Header
            headerSection
            
            // Quick Actions
            quickActionsSection
            
            // Post Input
            if showPostInput {
                postInputSection
            }
            
            // Safety Notice
            safetyNotice
            
            // Feed
            feedSection
        }
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Header Section
    private var headerSection: some View {
        VStack(spacing: 0) {
            // Navigation and Title
            HStack(spacing: 12) {
                Button(action: onBack) {
                    Image(systemName: "arrow.left")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 6) {
                        PulsingLiveIndicator()
                        Text("LIVE")
                            .font(.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    
                    Text("Man Utd vs Liverpool")
                        .font(.headline)
                        .foregroundColor(.white)
                }
                
                Spacer()
            }
            .padding()
            
            // Live Score Card
            VStack(spacing: 0) {
                HStack {
                    // Home Team
                    VStack {
                        Text("Man Utd")
                            .font(.subheadline)
                            .foregroundColor(.white)
                        Text("2")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.white)
                    }
                    .frame(maxWidth: .infinity)
                    
                    // Match Info
                    VStack(spacing: 8) {
                        HStack(spacing: 4) {
                            Image(systemName: "clock")
                                .font(.system(size: 12))
                                .foregroundColor(.white)
                            Text("67'")
                                .font(.caption)
                                .foregroundColor(.white)
                        }
                        
                        Text("2nd Half")
                            .font(.caption)
                            .fontWeight(.medium)
                            .foregroundColor(.white)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(Color.red.opacity(0.8))
                            .cornerRadius(8)
                    }
                    
                    // Away Team
                    VStack {
                        Text("Liverpool")
                            .font(.subheadline)
                            .foregroundColor(.white)
                        Text("1")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.white)
                    }
                    .frame(maxWidth: .infinity)
                }
                .padding()
            }
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.white.opacity(0.1))
                    .background(.ultraThinMaterial)
            )
            .padding(.horizontal)
            .padding(.bottom)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.red, Color.red.opacity(0.8)]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
    
    // MARK: - Quick Actions Section
    private var quickActionsSection: some View {
        HStack(spacing: 12) {
            Button(action: {
                showPostInput.toggle()
            }) {
                HStack {
                    Image(systemName: "message.fill")
                        .font(.system(size: 14))
                    Text("Share Reaction")
                        .fontWeight(.semibold)
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 44)
                .background(
                    LinearGradient(
                        gradient: Gradient(colors: [Color.blue, Color.purple]),
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .cornerRadius(12)
            }
            
            Button(action: {
                // Camera action
            }) {
                Image(systemName: "camera.fill")
                    .font(.system(size: 18))
                    .foregroundColor(.primary)
                    .frame(width: 44, height: 44)
                    .background(Color(.systemGray5))
                    .cornerRadius(12)
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
    
    // MARK: - Post Input Section
    private var postInputSection: some View {
        VStack(spacing: 12) {
            HStack(alignment: .top, spacing: 12) {
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
                        .frame(width: 40, height: 40)
                    
                    Text("YU")
                        .font(.headline)
                        .foregroundColor(.white)
                }
                
                // Text Input
                VStack(alignment: .trailing, spacing: 8) {
                    TextField("What's happening in the match? ⚽", text: $newPostContent, axis: .vertical)
                        .textFieldStyle(PlainTextFieldStyle())
                        .padding(12)
                        .background(Color(.systemGray5))
                        .cornerRadius(12)
                        .lineLimit(3...6)
                    
                    HStack {
                        Spacer()
                        Button(action: {
                            showPostInput = false
                            newPostContent = ""
                        }) {
                            Text("Cancel")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                        
                        Button(action: handlePost) {
                            Text("Post")
                                .font(.subheadline)
                                .fontWeight(.semibold)
                                .foregroundColor(.white)
                                .padding(.horizontal, 20)
                                .padding(.vertical, 8)
                                .background(
                                    newPostContent.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                                        ? Color.gray
                                        : Color.blue
                                )
                                .cornerRadius(8)
                        }
                        .disabled(newPostContent.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    }
                }
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
    
    // MARK: - Safety Notice
    private var safetyNotice: some View {
        HStack {
            Image(systemName: "lock.fill")
                .font(.system(size: 12))
                .foregroundColor(.blue)
            Text("DMs from strangers are disabled during Matchday Mode for your safety")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .padding(.horizontal)
        .background(Color.blue.opacity(0.1))
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color.blue.opacity(0.2)),
            alignment: .bottom
        )
    }
    
    // MARK: - Feed Section
    private var feedSection: some View {
        ScrollView {
            VStack(spacing: 16) {
                ForEach(posts) { post in
                    PostCard(post: post, onLike: {
                        handleLike(post.id)
                    })
                }
                
                // End of Feed
                VStack(spacing: 8) {
                    Image(systemName: "trophy.fill")
                        .font(.system(size: 32))
                        .foregroundColor(.secondary)
                    Text("You're all caught up!")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    Text("Check back for more match reactions")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding(.vertical, 32)
            }
            .padding()
        }
    }
    
    // MARK: - Actions
    private func handleLike(_ postId: String) {
        if let index = posts.firstIndex(where: { $0.id == postId }) {
            withAnimation {
                posts[index].isLiked.toggle()
                posts[index].likes += posts[index].isLiked ? 1 : -1
            }
        }
    }
    
    private func handlePost() {
        let trimmedContent = newPostContent.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedContent.isEmpty else { return }
        
        let newPost = MatchdayPost(
            id: String(posts.count + 1),
            userId: "current-user",
            userName: "You",
            userAvatar: "YU",
            content: trimmedContent,
            image: nil,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            isLiked: false
        )
        
        withAnimation {
            posts.insert(newPost, at: 0)
        }
        
        newPostContent = ""
        showPostInput = false
    }
}

// MARK: - Post Card
struct PostCard: View {
    let post: MatchdayPost
    var onLike: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Post Header
            HStack(spacing: 12) {
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
                        .frame(width: 40, height: 40)
                    
                    Text(post.userAvatar)
                        .font(.headline)
                        .foregroundColor(.white)
                }
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(post.userName)
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.primary)
                    Text(post.timestamp)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
            }
            
            // Post Content
            Text(post.content)
                .font(.body)
                .foregroundColor(.primary)
            
            // Post Image
            if let imageUrl = post.image {
                AsyncImage(url: URL(string: imageUrl)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color(.systemGray4))
                        .overlay(ProgressView())
                }
                .frame(height: 256)
                .cornerRadius(12)
                .clipped()
            }
            
            Divider()
            
            // Post Actions
            HStack(spacing: 24) {
                Button(action: onLike) {
                    HStack(spacing: 6) {
                        Image(systemName: post.isLiked ? "heart.fill" : "heart")
                            .font(.system(size: 18))
                            .foregroundColor(post.isLiked ? .red : .secondary)
                        Text("\(post.likes)")
                            .font(.subheadline)
                            .foregroundColor(post.isLiked ? .red : .secondary)
                    }
                }
                
                Button(action: {
                    // Comments action
                }) {
                    HStack(spacing: 6) {
                        Image(systemName: "message")
                            .font(.system(size: 18))
                            .foregroundColor(.secondary)
                        Text("\(post.comments)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
                
                Button(action: {
                    // Share action
                }) {
                    Image(systemName: "arrowshape.turn.up.right")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

// MARK: - Mock Data
let mockMatchdayPosts: [MatchdayPost] = [
    MatchdayPost(
        id: "1",
        userId: "1",
        userName: "Sarah M.",
        userAvatar: "SM",
        content: "GOALLLLLL! ⚽🔴 What an opener from Rashford!",
        image: nil,
        timestamp: "2 min ago",
        likes: 23,
        comments: 5,
        isLiked: true
    ),
    MatchdayPost(
        id: "2",
        userId: "2",
        userName: "James K.",
        userAvatar: "JK",
        content: "The atmosphere here is INSANE! 🔥",
        image: "https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        timestamp: "5 min ago",
        likes: 41,
        comments: 8,
        isLiked: false
    ),
    MatchdayPost(
        id: "3",
        userId: "5",
        userName: "Mia T.",
        userAvatar: "MT",
        content: "Pre-match meetup was amazing! Love this community 💙",
        image: nil,
        timestamp: "12 min ago",
        likes: 18,
        comments: 3,
        isLiked: true
    ),
    MatchdayPost(
        id: "4",
        userId: "3",
        userName: "Emma R.",
        userAvatar: "ER",
        content: "First time at Old Trafford and it did not disappoint! Thanks everyone for the warm welcome 🙏",
        image: nil,
        timestamp: "18 min ago",
        likes: 34,
        comments: 12,
        isLiked: true
    )
]

// MARK: - Pulsing Live Indicator
struct PulsingLiveIndicator: View {
    @State private var isPulsing = false
    
    var body: some View {
        ZStack {
            Circle()
                .fill(Color.red.opacity(0.8))
                .frame(width: 8, height: 8)
            
            Circle()
                .fill(Color.white)
                .frame(width: 8, height: 8)
                .opacity(isPulsing ? 0.3 : 0.9)
                .animation(
                    Animation.easeInOut(duration: 1.0)
                        .repeatForever(autoreverses: true),
                    value: isPulsing
                )
                .onAppear {
                    isPulsing = true
                }
        }
    }
}

// MARK: - Preview
struct MatchdayModeView_Previews: PreviewProvider {
    static var previews: some View {
        MatchdayModeView(eventId: "1", onBack: {
            print("Back tapped")
        })
    }
}


