::: mermaid
%% ---------------------------------------------------------------------
%% Panel 1: The Fiber-Optic Analogy - Internal View
%% Caption: Imagine you're a tiny observer (photon) inside a fiber-optic cable. This tunnel *is* your entire universe.
%% ---------------------------------------------------------------------
graph TD
    subgraph P1 [Panel 1: Internal View]
        direction LR
        P1_A[("You are Here<br>(Photon/Observer)")] --> P1_B(Forward Path);
        style P1_A fill:#f9f,stroke:#333,stroke-width:2px
        style P1_B fill:none,stroke:none
        linkStyle 0 stroke-width:0px;

        %% Simulate Tunnel Walls
        P1_C(( )) --- P1_A --- P1_D(( ));
        style P1_C fill:#555,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
        style P1_D fill:#555,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
        linkStyle 1 stroke:#aaa,stroke-width:0px;
        linkStyle 2 stroke:#aaa,stroke-width:0px;
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 2: The Fiber-Optic Analogy - Motion & Time
%% Caption: Inside, 'time' and 'motion' feel like a constant forward journey from Point A towards Point B.
%% ---------------------------------------------------------------------
graph TD
    subgraph P2 [Panel 2: Internal View - Motion]
        direction LR
        P2_Start(Point A) --> P2_Observer(Photon);
        P2_Observer -- Time/Motion --> P2_End(Point B);
        style P2_Start fill:#ccc,stroke:#333
        style P2_Observer fill:#f9f,stroke:#333,stroke-width:2px
        style P2_End fill:#ccc,stroke:#333
        linkStyle 1 stroke:#fff,stroke-width:2px,stroke-dasharray: 3;

        %% Imply tunnel walls
        P2_Wall1(( )) --- P2_Observer --- P2_Wall2(( ));
        style P2_Wall1 fill:#555,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
        style P2_Wall2 fill:#555,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
        linkStyle 2 stroke-width:0px;
        linkStyle 3 stroke-width:0px;
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 3: The Fiber-Optic Analogy - External View
%% Caption: An external observer sees the *entire* journey (A to B) at once. The photon inside is unaware of this outside view.
%% ---------------------------------------------------------------------
graph TD
    subgraph P3 [Panel 3: External View]
        direction LR
        P3_ExtObs(👁️ External Observer) --> P3_Cable;
        subgraph P3_Cable [Fiber Optic Cable]
            direction LR
            P3_A(Point A) --> P3_Photon((.)) --> P3_B(Point B);
            style P3_Photon fill:#f9f,stroke:#333,stroke-width:1px
            style P3_A fill:#ccc,stroke:#333
            style P3_B fill:#ccc,stroke:#333
        end
        style P3_Cable fill:none,stroke:#aaa,stroke-width:2px,color:#666
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 4: Extrapolating to Our Reality (3D in 4D)
%% Caption: Could our 3D universe be like the inside of the cable? We perceive vast distances, but perhaps within a larger, unseen structure (4th dimension?).
%% ---------------------------------------------------------------------
graph TD
    subgraph P4 [Panel 4: 3D in 4D Context?]
        direction LR
        style P4 fill:#eee,stroke:#ccc,stroke-dasharray: 5 5,stroke-width:2px

        subgraph P4_Our [Our 3D Universe]
            direction TB
            P4_Observer(👁️ Us);
            P4_Observer --> P4_DistantPoint1(Far Point);
            P4_Observer --> P4_DistantPoint2(Another Far Point);
            style P4_Our fill:none,stroke:#333,stroke-width:2px;
        end
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 5: The Illusion of Movement - Parallax/Dimensional Shift
%% Caption: Apparent movement (like cosmic expansion) might not just be objects moving *through* space, but the 'fabric' of dimensions shifting.
%% ---------------------------------------------------------------------
graph LR
    subgraph P5 [Panel 5: Movement Illusion Comparison]
        subgraph P5_FrameA [Frame A: Object Movement]
            direction TB
            P5_Obj1A(Galaxy A) ---|Space| P5_Obj2A(Galaxy B);
            P5_Obj2A -- Moves --> P5_Obj2A_Moved(Galaxy B');
            style P5_Obj1A fill:#aef
            style P5_Obj2A fill:#aef
            style P5_Obj2A_Moved fill:#aef,stroke-dasharray: 5 5
            linkStyle 0 stroke:#ccc,stroke-width:1px
            linkStyle 1 stroke:#f00,stroke-width:2px
        end

        subgraph P5_FrameB [Frame B: Space Warping]
             direction TB
             P5_Obj1B(Galaxy A) ---|Space Warps| P5_Obj2B(Galaxy B);
             style P5_Obj1B fill:#aef
             style P5_Obj2B fill:#aef
             linkStyle 2 stroke:#ccc,stroke-width:3px,stroke-dasharray: 1 8,stroke:#00f %% Dashed/warped line
        end
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 6: Information Entropy & The Need for Novelty
%% Caption: Reality might need constant novelty, like information. Too much repetition leads to breakdown; new input creates complexity and order (Anti-Chaos).
%% ---------------------------------------------------------------------
graph LR
    subgraph P6 [Panel 6: Entropy vs Novelty]
        subgraph P6_Rep [Repetition -> Decay]
            direction TD
            P6_Orig(Info) --> P6_Copy1(Info);
            P6_Copy1 --> P6_Copy2(Info + Error);
            P6_Copy2 --> P6_Copy3(Degraded Info);
            style P6_Orig fill:#afa
            style P6_Copy1 fill:#afa
            style P6_Copy2 fill:#af0,stroke-dasharray: 2 2
            style P6_Copy3 fill:#f88,stroke-width:3px
            P6_A((DNA)) -.-> P6_Copy3;
            P6_B((Code)) -.-> P6_Copy3;
            style P6_A fill:none,stroke:none
            style P6_B fill:none,stroke:none
            linkStyle 2 stroke:none; linkStyle 3 stroke:none;
        end
        subgraph P6_Nov [Novelty -> Complexity]
            direction TD
            P6_System1(Nodes) --> P6_System2(Nodes + New Element);
            P6_System2 --> P6_System3(More Complex System);
            style P6_System1 fill:#aaf
            style P6_System2 fill:#aaf,stroke-width:2px
            style P6_System3 fill:#aaf,stroke-width:3px
            P6_C((🌱)) -.-> P6_System3;
            P6_D((⚙️)) -.-> P6_System3;
            style P6_C fill:none,stroke:none
            style P6_D fill:none,stroke:none
            linkStyle 6 stroke:none; linkStyle 7 stroke:none;
        end
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 7: The Black Hole Hypothesis - Falling Through
%% Caption: What if our 'journey through time' is actually us moving through a stable path (Lagrange region?) within the influence of giant black holes?
%% ---------------------------------------------------------------------
graph TD
    subgraph P7 [Panel 7: Black Hole Path]
        P7_BH1((⚫️ Black Hole 1));
        P7_BH2((⚫️ Black Hole 2));

        subgraph P7_Path [Our Trajectory]
             direction LR
             P7_Start --> P7_Stable1(Stable Zone);
             P7_Stable1 --> P7_MidPoint(Passing Between);
             P7_MidPoint --> P7_Stable2(Stable Zone);
             P7_Stable2 --> P7_End(...);
             style P7_Path fill:none,stroke:#f9f,stroke-width:3px;
             style P7_Stable1 fill:#afc,stroke:#080,stroke-width:1px;
             style P7_Stable2 fill:#afc,stroke:#080,stroke-width:1px;
        end

        %% Position Path relative to BHs (Conceptual)
        P7_BH1 -- Gravity --> P7_Path;
        P7_BH2 -- Gravity --> P7_Path;
        linkStyle 2 stroke:none; linkStyle 3 stroke:none; %% Hide direct links visually
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 8: Black Holes & The Fiber-Optic View Combined
%% Caption: Inside this 'gravity tunnel', light bends intensely. Like the photon, we'd see 'distant' views, unaware the 'walls' (event horizon?) are hidden by bent light.
%% ---------------------------------------------------------------------
graph TD
    subgraph P8 [Panel 8: Internal BH View]
        direction LR
        P8_Observer(👁️ Us);
        style P8_Observer fill:#f9f,stroke:#333,stroke-width:2px

        %% Simulate Curved Spacetime / Light Bending
        P8_Distant1(Distant Object) ~~~> P8_Observer;
        P8_Distant2(Distant Object) ~~~> P8_Observer;
        P8_HiddenWall1((Boundary?)) -. Bends .-> P8_Observer;
        P8_HiddenWall2((Boundary?)) -. Bends .-> P8_Observer;

        linkStyle 0 stroke:#ff0,stroke-width:2px,stroke-dasharray: 5 2; %% Wavy line for light
        linkStyle 1 stroke:#ff0,stroke-width:2px,stroke-dasharray: 5 2; %% Wavy line for light
        linkStyle 2 stroke:none; %% Hide this connection line physically
        linkStyle 3 stroke:none; %% Hide this connection line physically

        %% Conceptual representation of walls/boundaries hidden by bending
        P8_B1(Curved Space) --- P8_Observer --- P8_B2(Curved Space);
        style P8_B1 fill:none,stroke:#aaa,stroke-width:1px,stroke-dasharray: 1 5
        style P8_B2 fill:none,stroke:#aaa,stroke-width:1px,stroke-dasharray: 1 5
        linkStyle 4 stroke-width:0px;
        linkStyle 5 stroke-width:0px;
    end
:::

::: mermaid
%% ---------------------------------------------------------------------
%% Panel 9: The Big Picture - Perception vs. Reality
%% Caption: Our experience of time and space might be a local perception, shaped by vast structures or dimensions we don't directly observe.
%% ---------------------------------------------------------------------
graph LR
    subgraph P9 [Panel 9: Perception vs Reality]
        subgraph P9_Our [Our Perception]
            direction TD
            P9_ObserverP(👁️ Us) --> P9_PerceivedUniverse[("Distant Stars/Galaxies")];
            style P9_Our fill:#eef,stroke:#99d
        end

        subgraph P9_Possible [A Possible Reality?]
            direction TD
            P9_ExternalStructure{Larger Context<br>(BH Path? 4D?)};
            P9_ObserverR(👁️ Us) -- Confined Within --> P9_ExternalStructure;
            style P9_Possible fill:#efe,stroke:#9d9
            P9_Q((?)) --- P9_Possible;
            style P9_Q fill:none,stroke:none
            linkStyle 1 stroke:none;
        end
    end
:::
