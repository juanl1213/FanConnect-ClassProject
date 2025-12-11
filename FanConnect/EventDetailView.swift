import SwiftUI

// MARK: - Attendee Model
struct Attendee: Identifiable {
    let id: String
    let name: String
    let avatar: String
    let favoriteTeam: String
    let vibe: Vibe
    let ageRange: String
    let verified: Bool
    
    enum Vibe: String {
        case chill = "Chill"
        case cheerSquad = "Cheer squad"
        case firstTimer = "First-timer"
        
        var color: Color {
            switch self {
            case .chill: return .blue
            case .cheerSquad: return .orange
            case .firstTimer: return .green
            }
        }
    }
}

// MARK: - Event Detail View
struct EventDetailView: View {
    @State private var attendees: [Attendee] = mockAttendees
    
    let eventId: String
    var onBack: () -> Void
    var onJoinChat: (String) -> Void
    var onStartMatchday: (String) -> Void
    
    // Mock event data - in real app, this would be fetched based on eventId
    private var event: Event {
        mockEvents.first { $0.id == eventId } ?? mockEvents[0]
    }
    
    init(eventId: String, onBack: @escaping () -> Void, onJoinChat: @escaping (String) -> Void, onStartMatchday: @escaping (String) -> Void) {
        self.eventId = eventId
        self.onBack = onBack
        self.onJoinChat = onJoinChat
        self.onStartMatchday = onStartMatchday
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Top spacing
                Spacer()
                    .frame(height: 40)
                
                // Back Button
                backButton
                    .padding(.top, 8)
                
                // Event Header
                eventHeader
                
                // Content
                contentSection
                
                // Bottom spacing for action buttons
                Color.clear
                    .frame(height: 100)
            }
        }
        .background(Color(.systemGroupedBackground))
        .ignoresSafeArea(edges: .top)
        .overlay(
            // Action Buttons (Fixed at bottom)
            actionButtons,
            alignment: .bottom
        )
    }
    
    // MARK: - Back Button
    private var backButton: some View {
        Button(action: onBack) {
            HStack(spacing: 8) {
                Image(systemName: "arrow.left")
                    .font(.system(size: 18))
                Text("Back to Events")
                    .font(.body)
            }
            .foregroundColor(.primary)
            .padding()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    // MARK: - Event Header
    private var eventHeader: some View {
        ZStack(alignment: .bottomLeading) {
            AsyncImage(url: URL(string: event.imageUrl)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Rectangle()
                    .fill(Color(.systemGray4))
                    .overlay(ProgressView())
            }
            .frame(height: 256)
            .clipped()
            
            // Gradient Overlay
            LinearGradient(
                gradient: Gradient(colors: [Color.clear, Color.black.opacity(0.4), Color.black.opacity(0.8)]),
                startPoint: .top,
                endPoint: .bottom
            )
            
            // Content
            VStack(alignment: .leading, spacing: 12) {
                Text(event.league)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.white)
                    .cornerRadius(12)
                
                Text("\(event.homeTeam) vs \(event.awayTeam)")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                HStack {
                    Image(systemName: "calendar")
                        .font(.system(size: 14))
                    Text("\(event.date) • \(event.time)")
                        .font(.subheadline)
                }
                .foregroundColor(.white.opacity(0.9))
            }
            .padding()
        }
    }
    
    // MARK: - Content Section
    private var contentSection: some View {
        VStack(spacing: 24) {
            // Venue Info Card
            venueInfoCard
            
            // About Section
            aboutSection
            
            // Safety Notice
            safetyNotice
            
            // Find Companions Section
            findCompanionsSection
        }
        .padding()
    }
    
    // MARK: - Venue Info Card
    private var venueInfoCard: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(Color.blue.opacity(0.15))
                    .frame(width: 48, height: 48)
                
                Image(systemName: "mappin.circle.fill")
                    .font(.system(size: 24))
                    .foregroundColor(.blue)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(event.venue)
                    .font(.headline)
                    .foregroundColor(.primary)
                Text(event.location)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text("\(event.distance) away")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Text(event.venueType.displayName)
                .font(.caption)
                .fontWeight(.medium)
                .foregroundColor(.primary)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Color(.systemGray5))
                .cornerRadius(8)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
    
    // MARK: - About Section
    private var aboutSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("About This Match")
                .font(.headline)
                .foregroundColor(.primary)
            
            Text("The biggest rivalry in English football! Join fellow fans for this epic showdown.")
                .font(.body)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    // MARK: - Safety Notice
    private var safetyNotice: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "shield.fill")
                .font(.system(size: 20))
                .foregroundColor(.blue)
            
            VStack(alignment: .leading, spacing: 4) {
                Text("Safety First")
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
                
                Text("All users are verified. Report any suspicious behavior. Meet in public places.")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color.blue.opacity(0.1))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.blue.opacity(0.2), lineWidth: 1)
        )
    }
    
    // MARK: - Find Companions Section
    private var findCompanionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Find Companions")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text("\(event.attendees) fans are going")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            
            // Attendee Cards
            VStack(spacing: 12) {
                ForEach(attendees) { attendee in
                    AttendeeCard(attendee: attendee)
                }
            }
            
            // View All Button
            Button(action: {
                // View all attendees action
            }) {
                Text("View All \(event.attendees) Attendees")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.blue)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Color(.systemGray5))
                    .cornerRadius(12)
            }
        }
    }
    
    // MARK: - Action Buttons
    private var actionButtons: some View {
        VStack(spacing: 12) {
            Button(action: {
                onJoinChat(eventId)
            }) {
                HStack {
                    Image(systemName: "message.fill")
                        .font(.system(size: 14))
                    Text("Join Group Chat")
                        .fontWeight(.semibold)
                }
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 50)
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
                onStartMatchday(eventId)
            }) {
                HStack {
                    Text("🔴")
                    Text("Start Matchday Mode")
                        .fontWeight(.medium)
                }
                .foregroundColor(.primary)
                .frame(maxWidth: .infinity)
                .frame(height: 50)
                .background(Color(.systemBackground))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color(.separator), lineWidth: 1)
                )
                .cornerRadius(12)
            }
        }
        .padding()
        .background(
            Color(.systemBackground)
                .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: -2)
        )
        .overlay(
            Rectangle()
                .frame(height: 0.5)
                .foregroundColor(Color(.separator)),
            alignment: .top
        )
    }
}

// MARK: - Attendee Card
struct AttendeeCard: View {
    let attendee: Attendee
    
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
                
                Text(attendee.avatar)
                    .font(.headline)
                    .foregroundColor(.white)
            }
            
            // Info
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 6) {
                    Text(attendee.name)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    if attendee.verified {
                        Image(systemName: "checkmark.shield.fill")
                            .font(.system(size: 14))
                            .foregroundColor(.blue)
                    }
                }
                
                Text("\(attendee.favoriteTeam) • \(attendee.ageRange)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Text(attendee.vibe.rawValue)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(attendee.vibe.color)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(attendee.vibe.color.opacity(0.15))
                    .cornerRadius(8)
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
let mockAttendees: [Attendee] = [
    Attendee(
        id: "1",
        name: "Sarah M.",
        avatar: "SM",
        favoriteTeam: "Manchester United",
        vibe: .cheerSquad,
        ageRange: "25-30",
        verified: true
    ),
    Attendee(
        id: "2",
        name: "James K.",
        avatar: "JK",
        favoriteTeam: "Liverpool",
        vibe: .chill,
        ageRange: "30-35",
        verified: true
    ),
    Attendee(
        id: "3",
        name: "Emma R.",
        avatar: "ER",
        favoriteTeam: "Manchester United",
        vibe: .firstTimer,
        ageRange: "20-25",
        verified: false
    ),
    Attendee(
        id: "4",
        name: "David L.",
        avatar: "DL",
        favoriteTeam: "Neutral",
        vibe: .chill,
        ageRange: "28-32",
        verified: true
    ),
    Attendee(
        id: "5",
        name: "Mia T.",
        avatar: "MT",
        favoriteTeam: "Manchester United",
        vibe: .cheerSquad,
        ageRange: "22-27",
        verified: true
    )
]

// MARK: - Preview
struct EventDetailView_Previews: PreviewProvider {
    static var previews: some View {
        EventDetailView(
            eventId: "1",
            onBack: {
                print("Back tapped")
            },
            onJoinChat: { chatId in
                print("Join chat: \(chatId)")
            },
            onStartMatchday: { eventId in
                print("Start matchday: \(eventId)")
            }
        )
    }
}


