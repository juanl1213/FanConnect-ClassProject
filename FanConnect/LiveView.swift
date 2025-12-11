//
//  LiveView.swift
//  FanConnect
//
//  Created by user on 11/30/25.
//

import SwiftUI

// MARK: - Live Match Model
struct LiveMatch: Identifiable {
    let id: String
    let homeTeam: String
    let awayTeam: String
    let homeScore: Int
    let awayScore: Int
    let status: MatchStatus
    let minute: String?
    let league: String
    let attendees: Int
    let imageUrl: String
    
    enum MatchStatus: String {
        case live = "live"
        case upcoming = "upcoming"
        case halftime = "halftime"
    }
}

// MARK: - Live View
struct LiveView: View {
    @State private var liveMatches: [LiveMatch] = mockLiveMatches
    @State private var upcomingMatches: [LiveMatch] = mockUpcomingMatches
    
    var onStartMatchday: (String) -> Void
    
    init(onStartMatchday: @escaping (String) -> Void) {
        self.onStartMatchday = onStartMatchday
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Live & In Progress Section
                liveMatchesSection
                
                // Starting Soon Section
                upcomingMatchesSection
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Live Matches Section
    private var liveMatchesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Section Header
            HStack {
                Image(systemName: "chart.line.uptrend.xyaxis")
                    .foregroundColor(.red)
                    .font(.system(size: 20))
                Text("Live & In Progress")
                    .font(.title2)
                    .fontWeight(.bold)
            }
            
            if liveMatches.isEmpty {
                // Empty State
                VStack(spacing: 16) {
                    Image(systemName: "chart.line.uptrend.xyaxis")
                        .font(.system(size: 32))
                        .foregroundColor(.secondary)
                        .frame(width: 64, height: 64)
                        .background(Color(.systemGray5))
                        .clipShape(Circle())
                    
                    Text("No live matches")
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text("Check back during match times")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
                .background(Color(.systemBackground))
                .cornerRadius(16)
            } else {
                // Live Match Cards
                VStack(spacing: 16) {
                    ForEach(liveMatches) { match in
                        LiveMatchCard(match: match, onStartMatchday: onStartMatchday)
                    }
                }
            }
        }
    }
    
    // MARK: - Upcoming Matches Section
    private var upcomingMatchesSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Section Header
            HStack {
                Image(systemName: "clock")
                    .foregroundColor(.blue)
                    .font(.system(size: 20))
                Text("Starting Soon")
                    .font(.title3)
                    .fontWeight(.bold)
            }
            
            // Upcoming Match Cards
            VStack(spacing: 16) {
                ForEach(upcomingMatches) { match in
                    UpcomingMatchCard(match: match, onStartMatchday: onStartMatchday)
                }
            }
        }
    }
}

// MARK: - Live Match Card
struct LiveMatchCard: View {
    let match: LiveMatch
    var onStartMatchday: (String) -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Image with Score Overlay
            ZStack {
                AsyncImage(url: URL(string: match.imageUrl)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color(.systemGray4))
                        .overlay(ProgressView())
                }
                .frame(height: 128)
                .opacity(0.4)
                .clipped()
                
                // Score Display
                VStack(spacing: 8) {
                    HStack(spacing: 24) {
                        // Home Team
                        VStack {
                            Text(match.homeTeam)
                                .font(.subheadline)
                                .foregroundColor(.primary)
                            Text("\(match.homeScore)")
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(.primary)
                        }
                        
                        Text("-")
                            .font(.title2)
                            .foregroundColor(.secondary)
                        
                        // Away Team
                        VStack {
                            Text(match.awayTeam)
                                .font(.subheadline)
                                .foregroundColor(.primary)
                            Text("\(match.awayScore)")
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(.primary)
                        }
                    }
                    
                    // Status Badges
                    HStack(spacing: 8) {
                        statusBadge(for: match.status)
                        if let minute = match.minute, match.status != .halftime {
                            Text(minute)
                                .font(.caption)
                                .fontWeight(.medium)
                                .foregroundColor(.secondary)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(Color(.systemGray5))
                                .cornerRadius(8)
                        }
                    }
                }
            }
            
            // Details Section
            VStack(spacing: 12) {
                // Attendees and League
                HStack {
                    HStack(spacing: 6) {
                        Image(systemName: "person.2")
                            .font(.system(size: 14))
                            .foregroundColor(.blue)
                        Text("\(match.attendees) fans watching together")
                            .font(.subheadline)
                            .foregroundColor(.blue)
                    }
                    
                    Spacer()
                    
                    Text(match.league)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundColor(.primary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(Color(.systemGray5))
                        .cornerRadius(8)
                }
                
                // Join Matchday Mode Button
                Button(action: {
                    onStartMatchday(match.id)
                }) {
                    HStack {
                        Image(systemName: "play.fill")
                            .font(.system(size: 14))
                        Text("Join Matchday Mode")
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .background(
                        LinearGradient(
                            gradient: Gradient(colors: [Color.red, Color.red.opacity(0.8)]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .cornerRadius(12)
                }
            }
            .padding()
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: 2)
    }
    
    @ViewBuilder
    private func statusBadge(for status: LiveMatch.MatchStatus) -> some View {
        switch status {
        case .live:
            LiveBadgeView()
            
        case .halftime:
            Text("Half Time")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Color.orange)
                .cornerRadius(8)
            
        case .upcoming:
            Text("Upcoming")
                .font(.caption)
                .fontWeight(.medium)
                .foregroundColor(.primary)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Color(.systemGray5))
                .cornerRadius(8)
        }
    }
}

// MARK: - Upcoming Match Card
struct UpcomingMatchCard: View {
    let match: LiveMatch
    var onStartMatchday: (String) -> Void
    
    var body: some View {
        VStack(spacing: 12) {
            HStack(alignment: .top, spacing: 12) {
                // Thumbnail Image
                AsyncImage(url: URL(string: match.imageUrl)) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    Rectangle()
                        .fill(Color(.systemGray4))
                        .overlay(ProgressView())
                }
                .frame(width: 48, height: 48)
                .cornerRadius(8)
                .clipped()
                
                // Match Info
                VStack(alignment: .leading, spacing: 4) {
                    Text("\(match.homeTeam) vs \(match.awayTeam)")
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    HStack {
                        Image(systemName: "clock")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                        if let minute = match.minute {
                            Text("Kicks off at \(minute)")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                
                Spacer()
                
                // Status Badge
                statusBadge(for: match.status)
            }
            
            Divider()
            
            // Footer
            HStack {
                HStack(spacing: 6) {
                    Image(systemName: "person.2")
                        .font(.system(size: 14))
                        .foregroundColor(.blue)
                    Text("\(match.attendees) fans going")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
                
                Spacer()
                
                Button(action: {
                    onStartMatchday(match.id)
                }) {
                    Text("View Details")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.blue)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color(.systemGray5))
                        .cornerRadius(8)
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.05), radius: 4, x: 0, y: 2)
    }
    
    @ViewBuilder
    private func statusBadge(for status: LiveMatch.MatchStatus) -> some View {
        switch status {
        case .live:
            HStack(spacing: 6) {
                Circle()
                    .fill(Color.white)
                    .frame(width: 6, height: 6)
                Text("LIVE")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(Color.red)
            .cornerRadius(6)
            
        case .halftime:
            Text("Half Time")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.orange)
                .cornerRadius(6)
            
        case .upcoming:
            Text("Upcoming")
                .font(.caption)
                .fontWeight(.medium)
                .foregroundColor(.primary)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color(.systemGray5))
                .cornerRadius(6)
        }
    }
}

// MARK: - Mock Data
let mockLiveMatches: [LiveMatch] = [
    LiveMatch(
        id: "1",
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        homeScore: 2,
        awayScore: 1,
        status: .live,
        minute: "67'",
        league: "Premier League",
        attendees: 47,
        imageUrl: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ),
    LiveMatch(
        id: "2",
        homeTeam: "Real Madrid",
        awayTeam: "Bayern Munich",
        homeScore: 1,
        awayScore: 1,
        status: .halftime,
        minute: "HT",
        league: "Champions League",
        attendees: 23,
        imageUrl: "https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    )
]

let mockUpcomingMatches: [LiveMatch] = [
    LiveMatch(
        id: "3",
        homeTeam: "Barcelona",
        awayTeam: "Atletico Madrid",
        homeScore: 0,
        awayScore: 0,
        status: .upcoming,
        minute: "15:00",
        league: "La Liga",
        attendees: 15,
        imageUrl: "https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ),
    LiveMatch(
        id: "4",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        homeScore: 0,
        awayScore: 0,
        status: .upcoming,
        minute: "19:30",
        league: "Premier League",
        attendees: 62,
        imageUrl: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    )
]

// MARK: - Live Badge with Pulsing Animation
struct LiveBadgeView: View {
    @State private var isPulsing = false
    
    var body: some View {
        HStack(spacing: 6) {
            Circle()
                .fill(Color.white)
                .frame(width: 8, height: 8)
                .opacity(isPulsing ? 0.3 : 1.0)
                .animation(
                    Animation.easeInOut(duration: 1.0)
                        .repeatForever(autoreverses: true),
                    value: isPulsing
                )
                .onAppear {
                    isPulsing = true
                }
            
            Text("LIVE")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 6)
        .background(Color.red)
        .cornerRadius(8)
    }
}

// MARK: - Preview
struct LiveView_Previews: PreviewProvider {
    static var previews: some View {
        LiveView(onStartMatchday: { eventId in
            print("Start matchday for: \(eventId)")
        })
    }
}


