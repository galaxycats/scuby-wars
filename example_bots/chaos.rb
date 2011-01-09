require "scuby-wars"

class Chaos < ScubyWars::Client
  
  def think
    change_turning
    change_fireing
    change_running
  end
  
  def change_turning
    if self.turning?
      self.stop_turning if rand(2) == 1
    else
      case rand(4)
      when 0
        self.turn_left
      when 1
        self.turn_right
      else
      end
    end
  end
  
  def change_fireing
    if self.fireing?
      self.stop_fireing if rand(4) == 1
    else
      self.fire if rand(4) == 1
    end
  end
  
  def change_running
    if self.running?
      self.stop if rand(2) == 0
    else
      self.run if rand(4) < 4
    end
  end
  
end

# Chaos.new("localhost:3000", "Chaos").join()