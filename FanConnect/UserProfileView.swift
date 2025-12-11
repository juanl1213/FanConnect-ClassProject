import SwiftUI

// MARK: - Profile Event Models
struct ProfileEvent: Identifiable {
    let id: String
    let title: String
    let date: String
    let venue: String
    let attendees: Int?
    let buddiesMet: Int?
}

struct GoalBuddy: Identifiable {
    let id: String
    let name: String
    let avatar: String
    let eventsMet: Int
}

enum ProfileTab {
    case upcoming
    case past
    case buddies
}

// MARK: - User Profile View
struct UserProfileView: View {
    @State private var selectedTab: ProfileTab = .upcoming
    @State private var upcomingEvents: [ProfileEvent] = mockUpcomingProfileEvents
    @State private var pastEvents: [ProfileEvent] = mockPastProfileEvents
    @State private var goalBuddies: [GoalBuddy] = mockGoalBuddies
    
    var onBack: () -> Void
    var onSettingsTap: () -> Void
    
    init(onBack: @escaping () -> Void, onSettingsTap: @escaping () -> Void) {
        self.onBack = onBack
        self.onSettingsTap = onSettingsTap
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header Section
                headerSection
                
                // Profile Content
                profileContentSection
            }
        }
        .background(Color(.systemGroupedBackground))
        .ignoresSafeArea(edges: .top)
    }
    
    // MARK: - Header Section
    private var headerSection: some View {
        VStack(spacing: 0) {
            // Navigation Bar
            HStack {
                Button(action: onBack) {
                    Image(systemName: "arrow.left")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.white.opacity(0.2))
                        .clipShape(Circle())
                }
                
                Spacer()
                
                Button(action: onSettingsTap) {
                    Image(systemName: "gearshape")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.white.opacity(0.2))
                        .clipShape(Circle())
                }
            }
            .padding()
            
            // Profile Info
            VStack(spacing: 12) {
                // Avatar
                ZStack {
                    Circle()
                        .fill(Color.white)
                        .frame(width: 96, height: 96)
                    
                    Text("YU")
                        .font(.system(size: 36, weight: .semibold))
                        .foregroundColor(.blue)
                }
                
                // Name and Username
                Text("Your Name")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text("@yourname")
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
                
                // Verified Badge
                HStack(spacing: 6) {
                    Image(systemName: "checkmark.shield.fill")
                        .font(.system(size: 14))
                        .foregroundColor(.green.opacity(0.8))
                    Text("Verified Account")
                        .font(.caption)
                        .foregroundColor(.green.opacity(0.8))
                }
                .padding(.top, 4)
                
                // Stats
                HStack(spacing: 24) {
                    VStack {
                        Text("12")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        Text("Events Attended")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    
                    Rectangle()
                        .fill(Color.white.opacity(0.2))
                        .frame(width: 1, height: 30)
                    
                    VStack {
                        Text("28")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        Text("GoalBuddies")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.8))
                    }
                    
                    Rectangle()
                        .fill(Color.white.opacity(0.2))
                        .frame(width: 1, height: 30)
                    
                    VStack {
                        Text("4.8")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                        Text("Rating ⭐")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
                .padding(.top, 8)
            }
            .padding(.bottom, 24)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
    
    // MARK: - Profile Content Section
    private var profileContentSection: some View {
        VStack(spacing: 16) {
            // Favorite Team Card
            favoriteTeamCard
            
            // My Vibe Card
            myVibeCard
            
            // Tabs Section
            tabsSection
            
            // Achievements Card
            achievementsCard
        }
        .padding()
    }
    
    // MARK: - Favorite Team Card
    private var favoriteTeamCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Favorite Team")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Spacer()
                
                Button(action: {
                    // Edit action
                }) {
                    Text("Edit")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
            }
            
            HStack(spacing: 12) {
                ZStack {
                    Circle()
                        .fill(Color.red)
                        .frame(width: 48, height: 48)
                    
                    Text("MU")
                        .font(.headline)
                        .foregroundColor(.white)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Text("Manchester United")
                        .font(.headline)
                        .foregroundColor(.primary)
                    Text("Premier League")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    // MARK: - My Vibe Card
    private var myVibeCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("My Vibe")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Spacer()
                
                Button(action: {
                    // Edit action
                }) {
                    Text("Edit")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
            }
            
            HStack(spacing: 8) {
                Text("Cheer squad")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.orange)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.orange.opacity(0.15))
                    .cornerRadius(12)
                
                Text("Social")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(.blue)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.blue.opacity(0.15))
                    .cornerRadius(12)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    // MARK: - Tabs Section
    private var tabsSection: some View {
        VStack(spacing: 0) {
            // Tab Selector
            HStack(spacing: 0) {
                tabButton(title: "Upcoming", tab: .upcoming)
                tabButton(title: "Past", tab: .past)
                tabButton(title: "Buddies", tab: .buddies)
            }
            .background(Color(.systemBackground))
            .cornerRadius(12)
            
            // Tab Content
            VStack(spacing: 12) {
                switch selectedTab {
                case .upcoming:
                    upcomingEventsContent
                case .past:
                    pastEventsContent
                case .buddies:
                    buddiesContent
                }
            }
            .padding(.top, 16)
        }
    }
    
    private func tabButton(title: String, tab: ProfileTab) -> some View {
        Button(action: {
            selectedTab = tab
        }) {
            Text(title)
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(selectedTab == tab ? .white : .primary)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(
                    selectedTab == tab
                        ? LinearGradient(
                            gradient: Gradient(colors: [Color.blue, Color.purple]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                        : LinearGradient(
                            gradient: Gradient(colors: [Color.clear, Color.clear]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                )
        }
    }
    
    // MARK: - Upcoming Events Content
    private var upcomingEventsContent: some View {
        VStack(spacing: 12) {
            ForEach(upcomingEvents) { event in
                ProfileEventCard(event: event, isUpcoming: true)
            }
        }
    }
    
    // MARK: - Past Events Content
    private var pastEventsContent: some View {
        VStack(spacing: 12) {
            ForEach(pastEvents) { event in
                ProfileEventCard(event: event, isUpcoming: false)
            }
        }
    }
    
    // MARK: - Buddies Content
    private var buddiesContent: some View {
        VStack(spacing: 16) {
            // Header
            VStack(spacing: 8) {
                Image(systemName: "trophy.fill")
                    .font(.system(size: 32))
                    .foregroundColor(.blue)
                
                Text("Your GoalBuddies")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text("Fans you've connected with at events")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.vertical, 8)
            
            // Buddies List
            VStack(spacing: 12) {
                ForEach(goalBuddies) { buddy in
                    GoalBuddyCard(buddy: buddy)
                }
            }
        }
    }
    
    // MARK: - Achievements Card
    private var achievementsCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Achievements")
                .font(.headline)
                .foregroundColor(.primary)
            
            HStack(spacing: 12) {
                achievementItem(emoji: "🏆", title: "First Match", color: .yellow)
                achievementItem(emoji: "🤝", title: "Social Butterfly", color: .blue)
                achievementItem(emoji: "⭐", title: "Top Rated", color: .green)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    private func achievementItem(emoji: String, title: String, color: Color) -> some View {
        VStack(spacing: 8) {
            Text(emoji)
                .font(.system(size: 32))
            Text(title)
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(color.opacity(0.15))
        .cornerRadius(12)
    }
}

// MARK: - Profile Event Card
struct ProfileEventCard: View {
    let event: ProfileEvent
    let isUpcoming: Bool
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 6) {
                    Text(event.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    HStack {
                        Image(systemName: "calendar")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                        Text(event.date)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
                
                Text(isUpcoming ? "Going" : "Attended")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(isUpcoming ? .primary : .secondary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(isUpcoming ? Color(.systemGray5) : Color.clear)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color(.separator), lineWidth: isUpcoming ? 0 : 1)
                    )
                    .cornerRadius(8)
            }
            
            HStack {
                Image(systemName: "mappin.circle")
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)
                Text(event.venue)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            
            Divider()
            
            if isUpcoming {
                HStack {
                    Image(systemName: "person.2")
                        .font(.system(size: 14))
                        .foregroundColor(.blue)
                    if let attendees = event.attendees {
                        Text("\(attendees) fans going")
                            .font(.subheadline)
                            .foregroundColor(.blue)
                    }
                }
            } else {
                HStack {
                    Image(systemName: "person.2")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                    if let buddiesMet = event.buddiesMet {
                        Text("Met \(buddiesMet) buddies")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    Button(action: {
                        // Review action
                    }) {
                        HStack(spacing: 4) {
                            Image(systemName: "star")
                                .font(.system(size: 14))
                            Text("Review")
                                .font(.subheadline)
                        }
                        .foregroundColor(.blue)
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

// MARK: - Goal Buddy Card
struct GoalBuddyCard: View {
    let buddy: GoalBuddy
    
    var body: some View {
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
                    .frame(width: 48, height: 48)
                
                Text(buddy.avatar)
                    .font(.headline)
                    .foregroundColor(.white)
            }
            
            // Info
            VStack(alignment: .leading, spacing: 4) {
                Text(buddy.name)
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text("Met at \(buddy.eventsMet) \(buddy.eventsMet == 1 ? "event" : "events")")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            // Message Button
            Button(action: {
                // Message action
            }) {
                Text("Message")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.blue)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(Color(.systemGray5))
                    .cornerRadius(8)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

// MARK: - Mock Data
let mockUpcomingProfileEvents: [ProfileEvent] = [
    ProfileEvent(
        id: "1",
        title: "Man Utd vs Liverpool",
        date: "Nov 9, 2024",
        venue: "Old Trafford",
        attendees: 47,
        buddiesMet: nil
    ),
    ProfileEvent(
        id: "2",
        title: "Real Madrid vs Bayern",
        date: "Nov 6, 2024",
        venue: "The Red Lion Sports Bar",
        attendees: 23,
        buddiesMet: nil
    )
]

let mockPastProfileEvents: [ProfileEvent] = [
    ProfileEvent(
        id: "1",
        title: "Chelsea vs Arsenal",
        date: "Oct 28, 2024",
        venue: "Stamford Bridge",
        attendees: nil,
        buddiesMet: 5
    ),
    ProfileEvent(
        id: "2",
        title: "Barcelona vs Real Madrid",
        date: "Oct 21, 2024",
        venue: "Sports Hub Bar",
        attendees: nil,
        buddiesMet: 3
    ),
    ProfileEvent(
        id: "3",
        title: "PSG vs Marseille",
        date: "Oct 15, 2024",
        venue: "Community Screening",
        attendees: nil,
        buddiesMet: 7
    )
]

let mockGoalBuddies: [GoalBuddy] = [
    GoalBuddy(id: "1", name: "Sarah M.", avatar: "SM", eventsMet: 3),
    GoalBuddy(id: "2", name: "James K.", avatar: "JK", eventsMet: 2),
    GoalBuddy(id: "3", name: "Emma R.", avatar: "ER", eventsMet: 1),
    GoalBuddy(id: "4", name: "David L.", avatar: "DL", eventsMet: 2),
    GoalBuddy(id: "5", name: "Mia T.", avatar: "MT", eventsMet: 1)
]

// MARK: - Preview
struct UserProfileView_Previews: PreviewProvider {
    static var previews: some View {
        UserProfileView(
            onBack: {
                print("Back tapped")
            },
            onSettingsTap: {
                print("Settings tapped")
            }
        )
    }
}


