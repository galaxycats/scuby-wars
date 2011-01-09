require "scuby-wars"

class ShotAndRun < ScubyWars::Client
  
  def think
    self.fire unless self.fireing?
    self.run unless self.running?
  end
  
end

# ShotAndRun.new("localhost:3000", "ShotAndRun").join()