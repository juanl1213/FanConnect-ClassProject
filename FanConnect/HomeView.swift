//
//  HomeView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//

import SwiftUI

// MARK: - Event Model
struct Event: Identifiable, Codable {
    let id: String
    let title: String
    let homeTeam: String
    let awayTeam: String
    let league: String
    let date: String
    let time: String
    let venue: String
    let venueType: VenueType
    let location: String
    let attendees: Int
    let imageUrl: String
    let distance: String
    
    enum VenueType: String, Codable {
        case stadium = "stadium"
        case bar = "bar"
        case screening = "screening"
        
        var displayName: String {
            switch self {
            case .stadium: return "🏟️ Stadium"
            case .bar: return "🍺 Bar"
            case .screening: return "📺 Screening"
            }
        }
    }
}

// MARK: - Home View
struct HomeView: View {
    @State private var selectedLeague: String = "all"
    @State private var viewMode: ViewMode = .list
    @State private var events: [Event] = mockEvents
    
    var onEventSelect: (String) -> Void
    
    enum ViewMode {
        case list
        case map
    }
    
    let leagues = ["all", "Premier League", "Champions League", "La Liga", "Serie A"]
    
    var filteredEvents: [Event] {
        if selectedLeague == "all" {
            return events
        }
        return events.filter { $0.league == selectedLeague }
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Welcome Banner
                welcomeBanner
                
                // League Filters
                leagueFilters
                
                // View Toggle
                viewToggle
                
                // Content
                if viewMode == .list {
                    eventListView
                } else {
                    mapViewPlaceholder
                }
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Welcome Banner
    private var welcomeBanner: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Find Your Match Crew! ⚽")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            Text("Connect with fans attending games near you")
                .font(.subheadline)
                .foregroundColor(.white.opacity(0.9))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
        .cornerRadius(16)
    }
    
    // MARK: - League Filters
    private var leagueFilters: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 12) {
                ForEach(leagues, id: \.self) { league in
                    Button(action: {
                        selectedLeague = league
                    }) {
                        Text(league == "all" ? "All Leagues" : league)
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(selectedLeague == league ? .white : .primary)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(
                                selectedLeague == league
                                    ? Color.blue
                                    : Color(.systemGray5)
                            )
                            .cornerRadius(20)
                    }
                }
            }
            .padding(.horizontal, 4)
        }
    }
    
    // MARK: - View Toggle
    private var viewToggle: some View {
        HStack(spacing: 12) {
            Button(action: {
                viewMode = .list
            }) {
                HStack {
                    Image(systemName: "calendar")
                        .font(.system(size: 14))
                    Text("List View")
                }
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(viewMode == .list ? .white : .primary)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(
                    viewMode == .list
                        ? Color.blue
                        : Color(.systemGray5)
                )
                .cornerRadius(12)
            }
            
            Button(action: {
                viewMode = .map
            }) {
                HStack {
                    Image(systemName: "map")
                        .font(.system(size: 14))
                    Text("Map View")
                }
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundColor(viewMode == .map ? .white : .primary)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .background(
                    viewMode == .map
                        ? Color.blue
                        : Color(.systemGray5)
                )
                .cornerRadius(12)
            }
        }
    }
    
    // MARK: - Event List View
    private var eventListView: some View {
        VStack(spacing: 16) {
            ForEach(filteredEvents) { event in
                EventCard(event: event) {
                    onEventSelect(event.id)
                }
            }
        }
    }
    
    // MARK: - Map View Placeholder
    private var mapViewPlaceholder: some View {
        VStack(spacing: 16) {
            Image(systemName: "map")
                .font(.system(size: 32))
                .foregroundColor(.blue)
                .frame(width: 64, height: 64)
                .background(Color.blue.opacity(0.1))
                .clipShape(Circle())
            
            Text("Map View")
                .font(.headline)
            
            Text("Interactive map showing nearby events and venues")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(.systemGray5))
                .frame(height: 256)
                .overlay(
                    Text("Map will display event locations here")
                        .foregroundColor(.secondary)
                )
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
    }
}

// MARK: - Event Card
struct EventCard: View {
    let event: Event
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 0) {
                // Image Section
                ZStack(alignment: .topTrailing) {
                    AsyncImage(url: URL(string: event.imageUrl)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Rectangle()
                            .fill(Color(.systemGray4))
                            .overlay(
                                ProgressView()
                            )
                    }
                    .frame(height: 192)
                    .clipped()
                    
                    // League Badge
                    Text(event.league)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.white)
                        .cornerRadius(12)
                        .padding(12)
                    
                    // Team Names Overlay
                    VStack {
                        Spacer()
                        HStack {
                            Text("\(event.homeTeam) vs \(event.awayTeam)")
                                .font(.headline)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                            Spacer()
                        }
                        .padding()
                        .background(
                            LinearGradient(
                                gradient: Gradient(colors: [Color.black.opacity(0.7), Color.clear]),
                                startPoint: .bottom,
                                endPoint: .top
                            )
                        )
                    }
                }
                
                // Details Section
                VStack(alignment: .leading, spacing: 12) {
                    // Date and Time
                    HStack {
                        Image(systemName: "calendar")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                        Text("\(event.date) • \(event.time)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    
                    // Location
                    HStack(alignment: .top) {
                        Image(systemName: "mappin.circle")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                        Text("\(event.venue) • \(event.distance)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                    }
                    
                    Divider()
                    
                    // Attendees and Venue Type
                    HStack {
                        HStack(spacing: 6) {
                            Image(systemName: "person.2")
                                .font(.system(size: 14))
                                .foregroundColor(.blue)
                            Text("\(event.attendees) fans going")
                                .font(.subheadline)
                                .foregroundColor(.blue)
                        }
                        
                        Spacer()
                        
                        Text(event.venueType.displayName)
                            .font(.caption)
                            .fontWeight(.medium)
                            .foregroundColor(event.venueType == .stadium ? .white : .primary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 6)
                            .background(
                                event.venueType == .stadium
                                    ? Color.blue
                                    : Color(.systemGray5)
                            )
                            .cornerRadius(8)
                    }
                }
                .padding()
            }
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: 2)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - Mock Data
let mockEvents: [Event] = [
    Event(
        id: "1",
        title: "Premier League",
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        league: "Premier League",
        date: "Nov 9, 2024",
        time: "17:30",
        venue: "Old Trafford",
        venueType: .stadium,
        location: "Manchester, UK",
        attendees: 47,
        imageUrl: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        distance: "2.3 km"
    ),
    Event(
        id: "2",
        title: "Champions League",
        homeTeam: "Real Madrid",
        awayTeam: "Bayern Munich",
        league: "Champions League",
        date: "Nov 6, 2024",
        time: "20:00",
        venue: "The Red Lion Sports Bar",
        venueType: .bar,
        location: "London, UK",
        attendees: 23,
        imageUrl: "https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        distance: "0.8 km"
    ),
    Event(
        id: "3",
        title: "La Liga",
        homeTeam: "Barcelona",
        awayTeam: "Atletico Madrid",
        league: "La Liga",
        date: "Nov 10, 2024",
        time: "15:00",
        venue: "Community Center Screening",
        venueType: .screening,
        location: "Birmingham, UK",
        attendees: 15,
        imageUrl: "https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NjIyNDQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        distance: "5.1 km"
    ),
    Event(
        id: "4",
        title: "Premier League",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        league: "Premier League",
        date: "Nov 7, 2024",
        time: "19:30",
        venue: "Emirates Stadium",
        venueType: .stadium,
        location: "London, UK",
        attendees: 62,
        imageUrl: "https://images.unsplash.com/photo-1686947079063-f1e7a7dfc6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NjIyNDIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        distance: "3.7 km"
    ),
    Event(
        id: "5",
        title: "Serie A",
        homeTeam: "AC Milan",
        awayTeam: "Inter Milan",
        league: "Serie A",
        date: "Nov 8, 2024",
        time: "18:00",
        venue: "Milano Sports Lounge",
        venueType: .bar,
        location: "Manchester, UK",
        attendees: 18,
        imageUrl: "https://images.unsplash.com/photo-1759171053149-d5cce4261405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYXIlMjB3YXRjaGluZyUyMGdhbWV8ZW58MXx8fHwxNzYyMjc4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        distance: "1.2 km"
    )
]

// MARK: - Preview
struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView(onEventSelect: { eventId in
            print("Selected event: \(eventId)")
        })
    }
}

